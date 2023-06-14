import { Preloader } from "shared/ui/Preloader/Preloader"
import style from "./Loader.module.scss"

export const Loader = () => {
	return <div className={style.loader}>
		<Preloader />
	</div>
}
