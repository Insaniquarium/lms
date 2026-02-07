import { NavLink, useParams } from "react-router";
import { useTitle } from "#/hooks";
import { formatDate } from "#/utils";
import { TabBar, TabBarLink } from "#/components/Tabs";
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
				<TabBarLink to="">Info</TabBarLink>
				<TabBarLink to="activity">Activity</TabBarLink>
				<TabBarLink to="courses">Courses</TabBarLink>
			</TabBar>
			<div className={style.tab_content}>
				<p>a</p>
			</div>
		</div>
	);
}
