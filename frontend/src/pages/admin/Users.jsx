import { Link } from "react-router";
import { useTitle } from "#/hooks";
import style from "./Users.module.scss";

export function Users() {
	useTitle(() => "Users");

	return (
		<div className={`${style.Users} page`}>
			<header className={style.heading_row}>
				<h1>Users</h1>
				<Link to="new" className="button">New User</Link>
			</header>
			<table>
				<thead>
					<tr>
						<th style={{width: "35%"}}>Name</th>
						<th style={{width: "30%"}}>Email address</th>
						<th>Role</th>
						<th>Accessed</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><Link to="0">Joseph Lastname</Link></td>
						<td>jlastname@email.com</td>
						<td>Admin</td>
						<td>1 day ago</td>
						<td>1 week ago</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
