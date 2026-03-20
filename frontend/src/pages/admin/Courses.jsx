import { Link } from "react-router";
import { Trash } from "lucide-react";
import { useAuth } from "#/auth";
import { useTitle, useApi } from "#/hooks";
import { formatDate } from "#/utils";
import style from "./Courses.module.scss";

export function Courses() {
	const {api} = useAuth();
	const [courses, req] = useApi(api => api.getCourses());

	useTitle(() => "Courses");

	if (req.pending) return;
	if (req.error) throw req.error;

	// TODO: Should this really be here, and not on each Course's page?
	// TODO: We really need confirmation using a modal or something!
	function deleteCourse(id) {
		//api.deleteCourse(id).then(() => /* reload list, somehow */0);
	}

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
								<button
									className={style.delete}
									aria-label="Delete course"
									onClick={() => deleteCourse(course.id)}
								>
									<Trash size={16}/>
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
