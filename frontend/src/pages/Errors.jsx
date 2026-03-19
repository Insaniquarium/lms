import { Link } from "react-router";
import style from "./Errors.module.scss";

export function ErrorFallback() {
	return (
		<div className={style.layout}>
			<p>An error occurred. Please try again later.</p>
		</div>
	);
}

export function NotFound() {
	return (
		<div className={style.layout}>
			<p>Page not found. Please check for any mistakes in the link.</p>
		</div>
	);
}
