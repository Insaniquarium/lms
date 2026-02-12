import { Link } from "react-router";
import { useTitle, useApi } from "#/hooks";
import { formatDate, toTitleCase } from "#/utils";
import style from "./Users.module.scss";

export function Users() {
	const [users, loading] = useApi(api => api.getUsers());

	useTitle(() => "Users");

	if (loading)
		return;

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
					{users.map(user =>
						<tr>
							<td><Link to={`${user.id}`}>{user.first_name} {user.last_name}</Link></td>
							<td>{user.email}</td>
							<td>{toTitleCase(user.role)}</td>
							<td>{formatDate(user.last_accessed * 1000)}</td>
							<td>{formatDate(user.created * 1000)}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
