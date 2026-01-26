import { Link } from "react-router";
import * as dummy from "./dummy";
import Card from "./Card";
import CourseInfoRow from "./CourseInfoRow";
import style from "./Courses.module.scss";

export default function Courses() {
	return (
		<div className={style.Courses}>
			<h1>My Courses</h1>
			<p>You are enrolled in <b>{dummy.myCourses.length}</b> courses.</p>
			<ul>
				{dummy.myCourses.map(course => <li><Card><CourseInfoRow course={course}/></Card></li> )}
			</ul>
			<p class="text-center neutral">You can enrol in more courses from the <Link to="library">library</Link>.</p>
		</div>
	);
}
