import { useTitle } from "#/hooks";
import style from "./Library.module.scss";

export default function Library() {
	useTitle(() => "Library");

	return (
		<div className={`${style.Library} page`}>
			<h1>Library</h1>
		</div>
	);
}
