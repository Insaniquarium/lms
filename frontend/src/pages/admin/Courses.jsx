import { Link } from "react-router";
import { Trash } from "lucide-react";
import { useTitle } from "#/hooks";
import * as dummy from "#/dummy";
import style from "./Courses.module.scss";

export function Courses() {
	useTitle(() => "Courses");

	return (
		<div className={`${style.Courses} page`}>
			<header className={style.heading_row}>
				<h1>Courses</h1>
				<button>New Course</button>
			</header>
			<table>
				<thead>
					<tr>
						<th style={{width: "90%"}}>Name</th>
						<th>Enrollments</th>
						<th>Created</th>
						<th style={{width: "10%"}}></th>
					</tr>
				</thead>
				<tbody>
					{dummy.courses.map(course =>
						<tr>
							<td><Link to="#">{course.name}</Link></td>
							<td>1</td>
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
