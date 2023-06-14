import { InputHTMLAttributes } from "react"
import style from "./Field.module.scss"

type IField = InputHTMLAttributes<HTMLInputElement>

export const Field = (props: IField) => {
	return <input className={style.Field} {...props} />
}
