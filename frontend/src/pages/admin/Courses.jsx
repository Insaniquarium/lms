import { Link } from "react-router";
import { Trash } from "lucide-react";
import { useTitle } from "#/hooks";
import * as dummy from "#/dummy";
import style from "./Courses.module.scss";

export function Courses() {
	useTitle(() => "Courses");

	return (
		<div className="page">
			<header className={style.heading_row}>
				<h1>Courses</h1>
				<Link to="new" className="button">New Course</Link>
			</header>
			<table>
				<thead>
					<tr>
						<th style={{width: "90%"}}>Name</th>
						<th>Enrolments</th>
						<th>Visibility</th>
						<th>Created</th>
						<th style={{width: "10%"}}></th>
					</tr>
				</thead>
				<tbody>
					{dummy.courses.map(course =>
						<tr>
							<td><Link to={`${course.id}`}>{course.name}</Link></td>
							<td className="text_right">{course.enrolments}</td>
							<td>Public</td>
							<td className={style.created}>1 day ago</td>
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
