import { Link } from "react-router";
import style from "./NotFound.module.scss";

export default function NotFound() {
	return (
		<div className={style.layout}>
			<p>Page not found. Please check for any mistakes in the link, or <Link to="/help">contact us.</Link></p>
		</div>
	);
}
