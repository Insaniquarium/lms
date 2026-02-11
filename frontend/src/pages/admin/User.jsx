import { useId } from "react";
import { useParams, Outlet } from "react-router";
import { useTitle } from "#/hooks";
import { formatDate } from "#/utils";
import { TabBar, TabContent } from "#/components/Tabs";
import * as dummy from "#/dummy";
import style from "./User.module.scss";

export function User() {
	const { userID } = useParams();
	const user = dummy.users.find(u => u.id == userID);

	useTitle(() => user.name, [user]);

	return (
		<div className={`${style.User} page`}>
			<h1>{user.name}</h1>

			<TabBar>
				<TabBar.Link to="">Info</TabBar.Link>
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
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const roleId = useId();
	const { userID } = useParams();
	const user = dummy.users.find(u => u.id == userID);

	function modify(formData) {

	}

	return (
		<div className={style.User_Info}>
			<p><b>Last active</b>: 1 day ago</p>

			{/* display: contents */}
			<form action={modify}>
				{/* really should be first/last name as dashboard greeting only needs first */}
				<label htmlFor={nameId}>Name:</label>
				<input type="text" name="name" id={nameId} defaultValue={user.name} required/> {/* value!! */}

				<label htmlFor={emailId}>Email address:</label>
				<input type="email" name="email" id={emailId} defaultValue={user.email} required/>

				<label htmlFor={passwordId}>Password:</label>
				<input type="password" name="password" placeholder="Password" id={passwordId}/>

				<label htmlFor={roleId}>Role:</label>
				<select name="role" id={roleId}>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
					<option value="admin">Admin</option>
				</select>

				<input type="submit" value="Modify"/>
			</form>
		</div>
	);
}

User.Activity = function() {

}

User.Courses = function() {

}
