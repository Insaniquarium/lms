import { Link } from "react-router";
import * as dummy from "./dummy";
import style from "./Course.module.scss";

export default function Course() {
	const course = dummy.myCourses[0];

	return (
		<div class={style.Course}>
			<h1>{course.name}</h1>
		</div>
	);
}
