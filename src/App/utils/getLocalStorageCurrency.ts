export const getLocalStorageCurrency = () => {
	const currencyFromLS = localStorage.getItem("currency")
	if (currencyFromLS) {
		return JSON.parse(currencyFromLS)
	} else {
		return undefined
	}
}
