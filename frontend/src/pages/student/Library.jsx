import { useTitle, useApi } from "#/hooks";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import style from "./Library.module.scss";

export default function Library() {
	const [courses, loading] = useApi(api => api.getCourses());

	useTitle(() => "Library");

	if (loading)
		return;

	return (
		<div className={`${style.Library} page`}>
			<h1>Library</h1>

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
