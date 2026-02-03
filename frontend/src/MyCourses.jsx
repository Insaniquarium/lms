import { Link } from "react-router";
import * as dummy from "./dummy";
import Card from "./Card";
import { CourseInfoRow } from "./InfoRow";
import style from "./MyCourses.module.scss";

export default function MyCourses() {
	return (
		<div className={`${style.MyCourses} page`}>
			<h1>My Courses</h1>
			<p>You are enrolled in <b>{dummy.myCourses.length}</b> courses.</p>
			<ul>
				{dummy.myCourses.map(course =>
					<li key={course.id}>
						<Card><CourseInfoRow course={course}/></Card>
					</li>
				)}
			</ul>
			<p className="text_center neutral">You can enrol in more courses from the <Link to="/courses">library</Link>.</p>
		</div>
	);
}
