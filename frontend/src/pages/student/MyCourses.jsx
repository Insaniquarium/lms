import { Link } from "react-router";
import { useAuth } from "#/auth";
import { useTitle, useApi } from "#/hooks";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import style from "./MyCourses.module.scss";

export default function MyCourses() {
	const {id} = useAuth();
	const [courses, loading] = useApi(api => api.getUserCourses(id));

	useTitle(() => "My Courses");

	if (loading)
		return;

	return (
		<div className={`${style.MyCourses} page`}>
			<h1>My Courses</h1>
			<p>You are enrolled in <b>{courses.length}</b> courses.</p>
			<ul>
				{courses.map(course =>
					<li key={course.id}>
						<Card><CourseInfoRow course={course}/></Card>
					</li>
				)}
			</ul>
			<p className="text_center neutral">You can enrol in more courses from the <Link to="/courses">library</Link>.</p>
		</div>
	);
}
