import { Link } from "react-router";
import { useTitle } from "#/hooks";
import { formatDate } from "#/utils";
import * as dummy from "#/dummy";
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
					{dummy.users.map(user =>
						<tr>
							<td><Link to={`${user.id}`}>{user.name}</Link></td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>{formatDate(user.accessed * 1000)}</td>
							<td>{formatDate(user.created * 1000)}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
