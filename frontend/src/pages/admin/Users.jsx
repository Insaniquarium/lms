import { useTitle } from "#/hooks";
import style from "./Users.module.scss";

export function Users() {
	useTitle(() => "Users");

	return (
		<div className={`${style.Users} page`}>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Joseph Lastname</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
