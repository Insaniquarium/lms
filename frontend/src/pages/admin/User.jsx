import { useId } from "react";
import { useParams, Outlet, Link } from "react-router";
import { useTitle, useApi } from "#/hooks";
import { formatDate } from "#/utils";
import { TabBar, TabContent } from "#/components/Tabs";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import style from "./User.module.scss";

export function User() {
	const { userID } = useParams();
	const [user, loading] = useApi(api => api.getUser(userID));

	useTitle(() => user ? `${user.first_name} ${user.last_name}` : "User", [user]);

	if (loading)
		return;

	return (
		<div className={`${style.User} page`}>
			<h1>{user.first_name} {user.last_name}</h1>

			<TabBar>
				<TabBar.Link to="info">Info</TabBar.Link>
				<TabBar.Link to="activity">Activity</TabBar.Link>
				<TabBar.Link to="courses">Courses</TabBar.Link>
			</TabBar>
			<TabContent>
				<Outlet/>
			</TabContent>
		</div>
	);
}

User.Info = function () {
	const { userID } = useParams();
	const [user, loading] = useApi(api => api.getUser(userID));

	if (loading)
		return;

	function modify(formData) {

	}

	return (
		<div className={style.User_Info}>
			<p><b>Created</b>: {formatDate(user.created * 1000)}</p>
			<p><b>Last accessed</b>: {formatDate(user.last_accessed * 1000)}</p>

			<form action={modify}>
				<label>
					Name:
					<div className={style.row}>
						<input type="text" name="first_name" placeholder="First name" defaultValue={user.first_name} required/>
						<input type="text" name="last_name" placeholder="Last name" defaultValue={user.last_name} required/>
					</div>
				</label>

				<label>
					Email address:
					<input type="email" name="email" placeholder="john.doe@email.com" defaultValue={user.email} required/>
				</label>

				<label>
					Password:
					<input type="password" name="password" placeholder="Password"/>
				</label>

				<label>
					Role:
					<select name="role">
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
						<option value="admin">Admin</option>
					</select>
				</label>

				<input type="submit" value="Modify"/>
			</form>
		</div>
	);
}

User.Activity = function() {
	const { userID } = useParams();
	const [activity, loading] = useApi(api => api.getUserActivity(userID));

	if (loading)
		return;

	return (
		<div className={style.User_Activity}>
			<table>
				<thead>
					<tr>
						<th>Course</th>
						<th>Module</th>
						<th>Started</th>
						<th>Completed</th>
					</tr>
				</thead>
				<tbody>
					{activity.map(a =>
						<tr>
							<td><Link to={`/admin/courses/${a.course_id}`}>{a.course_name}</Link></td>
							<td><Link to={`/admin/courses/${a.course_id}/modules/${a.module_id}`}>{a.module_name}</Link></td>
							<td>{formatDate(a.started_when)}</td>
							<td>{formatDate(a.completed_when)}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

User.Courses = function() {
	const { userID } = useParams();
	const [courses, loading] = useApi(api => api.getUserCourses(userID));

	if (loading)
		return;

	// TODO: Clicking on a course would instead link to a list of the modules a user has done
	return (
		<div className={style.User_Courses}>
			<ul>
				{courses.map(course =>
					<li key={course.id}>
						<CourseInfoRow course={course} link="#"/>
					</li>
				)}
			</ul>
		</div>
	);
}
