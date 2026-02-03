import { useTitle } from "#/hooks";
import style from "./Module.module.scss";

export default function Module() {
	return (
		<div className={style.Module}>
			<iframe src="data:text/html,<h1>test</h1>" style={{background: "gray"}}></iframe>
		</div>
	);
}
