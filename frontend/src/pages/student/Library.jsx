import { useTitle, useApi } from "#/hooks";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import style from "./Library.module.scss";

export default function Library() {
	const [courses, loading, error] = useApi(api => api.getCourses());

	useTitle(() => "Library");

	if (loading) return;
	if (error) throw error;

	return (
		<div className={`${style.Library} page`}>
			<h1>Library</h1>
			<p>There are <b>{courses.length}</b> courses available.</p>
			<ul>
				{courses.map(course =>
					<li key={course.id}>
						<Card><CourseInfoRow course={course}/></Card>
					</li>
				)}
			</ul>
		</div>
	);
}
