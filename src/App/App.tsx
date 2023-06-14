import { ChangeEvent, useEffect, useState } from "react";
import style from "./App.module.scss";
import { getCurrency } from "api/api";
import { List } from "shared/ui/List/ui/List";
import { IItem } from "shared/types/type";
import { Field } from "shared/ui/Field/Field";

export const App = () => {
  const [currencyList, setCurrencyList] = useState<IItem[]>([]);
  const [currentCurrency, setCurrentCurrency] = useState<IItem | undefined>();
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
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    if (currentCurrency?.value) {
      setinRuble(`${Number(input) * Number(currentCurrency?.value)}`);
    }
  }, [currentCurrency, input]);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currentCurrency as IItem));
  }, [currentCurrency]);

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
            <Field type="number" value={input} onChange={handlerInput} />
            <List
              value={currentCurrency}
              onSelect={handlerSelectCurrency}
              list={currencyList}
            />
            <Field value={inRuble} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};
