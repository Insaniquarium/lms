import { useId } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTitle } from "#/hooks";
import { useAuth } from "#/auth";
import { API } from "#/api";
import { Card } from "#/components/Card"
import style from "./Login.module.scss";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();
	const emailId = useId();
	const passwordId = useId();

	useTitle(() => "Login");

	function goBack() {
		navigate(location.state?.from?.pathname || "/", { replace: true });
	}

	async function login(formData) {
		const response = await auth.api.login(formData.email, formData.password);
		auth.login(new API(response.token), response.id);
		goBack();
	}

	if (auth.api.authenticated()) {
		goBack();
	}

	return (
		<main className={style.Login}>
			<Card>
				<h1>Login</h1>
				
				<form action={login}>
					<label htmlFor={emailId}>Email address:</label>
					<input type="email" name="email" id={emailId} autoComplete="off"/>

					<label htmlFor={passwordId}>Password:</label>
					<input type="password" name="password" id={passwordId}/>

					<input type="submit" value="Login"/>
				</form>

				<a href="#">Trouble logging in?</a>
			</Card>
		</main>
	);
}
