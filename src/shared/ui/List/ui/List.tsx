import { useEffect, useRef, useState } from "react";
import { IItem } from "shared/types/type";
import style from "./List.module.scss";
import { ReactComponent as Arrow } from "../assets/Vector.svg";

interface IList {
  list: IItem[];
  onSelect: (item: IItem) => void;
  value?: IItem;
}

export const List = ({ list, onSelect, value }: IList) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlerOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handlerClose = () => {
    setIsOpen(false);
  };

  const cb = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      handlerClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", cb);
    return () => document.removeEventListener("mousedown", cb);
  }, []);

  return (
    <div className={style.List}>
      <div className={style.List__Input} onClick={handlerOpen} ref={ref}>
        {value ? `${value.name} ${value.description}` : "выберите валюту"}
        <Arrow />
        {isOpen && (
          <div className={style.List__Items}>
            {list.map((el) => (
              <div
                key={el.id}
                className={style.List__Item}
                onClick={() => {
                  onSelect(el);
                }}
              >
                {el.name} {el.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
