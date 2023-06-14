import axios from "axios"

export const getCurrency = async () =>
	(await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")).data.Valute
