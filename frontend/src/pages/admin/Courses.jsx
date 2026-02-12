import { Link } from "react-router";
import { Trash } from "lucide-react";
import { useTitle, useApi } from "#/hooks";
import { formatDate, toTitleCase } from "#/utils";
import style from "./Courses.module.scss";

export function Courses() {
	const [courses, loading] = useApi(api => api.getCourses());

	useTitle(() => "Courses");

	if (loading)
		return;

	return (
		<div className={`${style.Courses} page`}>
			<header className={style.heading_row}>
				<h1>Courses</h1>
				<Link to="new" className="button">New Course</Link>
			</header>
			<table>
				<thead>
					<tr>
						<th style={{width: "90%"}}>Name</th>
						<th>Modules</th>
						<th>Enrolments</th>
						<th>Visibility</th>
						<th>Created</th>
						<th style={{width: "10%"}}></th>
					</tr>
				</thead>
				<tbody>
					{courses.map(course =>
						<tr>
							<td><Link to={`${course.id}`}>{course.name}</Link></td>
							<td className="text_right">{course.modules}</td>
							<td className="text_right">{course.enrolments}</td>
							<td>{toTitleCase(course.visibility)}</td>
							<td className={style.created}>{formatDate(course.created * 1000)}</td>
							<td className={style.actions}>
								<button className={style.delete}><Trash size={16}/></button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
