import style from "./BaseLayout.module.scss";

export function BaseLayout({ children }) {
	return <div className={style.BaseLayout}>{ children }</div>;
}
