import { ChangeEvent, useEffect, useState } from "react"
import style from "./App.module.scss"
import { getCurrency } from "api/api"
import { List } from "shared/ui/List/ui/List"
import { Field } from "shared/ui/Field/Field"
import { Loader } from "widgets/Loader/Loader"
import { getLocalStorageCurrency } from "App/utils/getLocalStorageCurrency"
import { IItem } from "shared/types/type"

export const App = () => {
	const [currencyList, setCurrencyList] = useState<IItem[]>([])
	const [currentCurrency, setCurrentCurrency] = useState<IItem | undefined>(
		getLocalStorageCurrency()
	)
	const [input, setInput] = useState<string>("0")
	const [inRuble, setinRuble] = useState<undefined | string>(undefined)
	const [isPending, setIsPending] = useState(true)

	const handlerSelectCurrency = (currency: IItem) => {
		setCurrentCurrency(currency)
	}

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
				)
				setIsPending(false)
			})
			.catch((error) => {
				setIsPending(false)
				alert(error)
			})
		setIsPending(true)
	}, [])

	useEffect(() => {
		if (currentCurrency?.value) {
			setinRuble(`${Number(input) * Number(currentCurrency?.value)}`)
		}
	}, [currentCurrency, input])

	useEffect(() => {
		if (currentCurrency) {
			localStorage.setItem("currency", JSON.stringify(currentCurrency))
		}
	}, [currentCurrency])

	const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value)
	}

	return (
		<div className={style.App}>
			{isPending ? <Loader /> : null}
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
						<div className={style.Inner__InRubles}>
							<Field value={inRuble} readOnly />
							<span>₽</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
