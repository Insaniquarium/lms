import { useId } from "react";
import Card from "./Card"
import style from "./Login.module.scss";

export default function Login() {
	const emailId = useId();
	const passwordId = useId();

	function login(formData) {

	}

	return (
		<main className={style.Login}>
			<Card>
				<h1>Login</h1>
				
				<form action={login}>
					<label htmlFor={emailId}>Email address:</label>
					<input type="email" name="email" id={emailId}/>

					<label htmlFor={passwordId}>Password:</label>
					<input type="password" name="password" id={passwordId}/>

					<input type="submit" value="Login"/>
				</form>

				<a href="#">Trouble logging in?</a>
			</Card>
		</main>
	);
}
