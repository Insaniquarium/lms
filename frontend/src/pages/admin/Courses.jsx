import { Link } from "react-router";
import { Trash } from "lucide-react";
import { useTitle, useApi } from "#/hooks";
import { formatDate, toTitleCase } from "#/utils";
import style from "./Courses.module.scss";

export function Courses() {
	const [courses, loading, error] = useApi(api => api.getCourses());

	useTitle(() => "Courses");

	if (loading) return;
	if (error) throw error;

	return (
		<div className={`${style.Courses} page`}>
			<header className={style.heading_row}>
				<h1>Courses</h1>
				<Link to="new" className="button">New Course</Link>
			</header>
			<table>
				<thead>
					<tr>
						<th style={{width: "90%"}}>Title</th>
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
							<td><Link to={`${course.id}`}>{course.title}</Link></td>
							<td className="text_right">{course.modules}</td>
							<td className="text_right">{course.enrolments}</td>
							<td>{course.public ? "Public" : "Private"}</td>
							<td>{formatDate(course.created_at)}</td>
							<td className={style.actions}>
								<button className={style.delete} aria-label="Delete course"><Trash size={16}/></button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
