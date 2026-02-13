import { useId } from "react";
import { useTitle } from "#/hooks";
import style from "./NewUser.module.scss";

export function NewUser() {
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const roleId = useId();

	useTitle(() => "New User");

	function create(formData) {

	}

	return (
		<div className={`${style.NewUser} page`}>
			<h1>New User</h1>
			<form action={create}>
				<label htmlFor={nameId}>Name:</label>
				<div className={style.row}>
					<input type="text" name="first_name" id={nameId} placeholder="John" required/>
					<input type="text" name="last_name" placeholder="Doe" required/>
				</div>

				<label htmlFor={emailId}>Email address:</label>
				<input type="email" name="email" id={emailId} placeholder="john.doe@email.com" required/>

				<label htmlFor={passwordId}>Password:</label>
				<input type="password" name="password" id={passwordId} required/>

				<label htmlFor={roleId}>Role:</label>
				<select name="role" id={roleId}>
					<option value="student">Student</option>
					<option value="teacher">Teacher</option>
					<option value="admin">Admin</option>
				</select>

				<input type="submit" value="Create"/>
			</form>
		</div>
	);
}
