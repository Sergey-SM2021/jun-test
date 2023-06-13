import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./App.module.scss";
import { getCurrency } from "api/api";

interface IItem {
  name: string;
  description: string;
  id: string;
  value: string;
}

export const App = () => {
  const [currencyList, setCurrencyList] = useState<IItem[]>([]);
  const [currentCurrency, setCurrentCurrency] = useState<IItem | null>(null);
  const [input, setInput] = useState<string>("0");
  const [inRuble, setinRuble] = useState<undefined | string>(undefined);

  const handlerSelectCurrency = (currency: IItem) => {
    setCurrentCurrency(currency);
  };

  useEffect(() => {
    getCurrency()
      .then((data) => {
        setCurrencyList(
          Object.keys(data).map((el) => ({
            name: el,
            description: data[el].Name,
            id: data[el].ID,
            value: data[el].Value,
          }))
        );
      })
  }, []);

  useEffect(() => {
    if (currentCurrency?.value) {
      setinRuble(`${Number(input) * Number(currentCurrency?.value)}`);
    }
  }, [currentCurrency, input]);

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  return (
    <div className={style.App}>
      <div className={style.App__Inner}>
        <div className={style.Container}>
          <div className={style.Inner__Title}>
            <h1>Конвертер валют</h1>
          </div>
          <div className={style.Inner__Content}>
            <input value={input} onChange={handlerInput} />
            <select>
              {currencyList.map((el) => (
                <option onClick={() => handlerSelectCurrency(el)}>
                  {el.name} ({el.description})
                </option>
              ))}
            </select>
            <input type="text" value={inRuble} />
          </div>
        </div>
      </div>
    </div>
  );
};
