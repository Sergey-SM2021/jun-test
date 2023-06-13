import { InputHTMLAttributes } from "react";
import style from "./Field.module.scss";

interface IField extends InputHTMLAttributes<HTMLInputElement> {}

export const Field = (props: IField) => {
  return <input className={style.Field} {...props} />;
};
