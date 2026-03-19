import { useId, useState, useEffect } from "react";
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
	const [error, setError] = useState(null);

	useTitle(() => "Login");

	/**
	 * The state is set by RequireAuth to the path we tried to visit, but
	 * couldn't because we had no token set, thus we were redirected here.
	 *
	 * This allows us to return back to the page the user originally tried to
	 * visit after they log in.
	 *
	 * Otherwise, redirect to /, which should send us to the main home page.
	 */
	function goBack() {
		navigate(location.state?.from?.pathname || "/", { replace: true });
	}

	useEffect(() => {
		// We're already logged in, go away from the login page!
		if (auth.api.token()) {
			goBack();
		}
	}, []);

	async function login(formData) {
		try {
			/**
			 * TODO: Or we could just not have user ID in the /login response,
			 * and the useEffect in AuthProvider will always be responsible for
			 * retrieving the current user ID?
			 */
			const { token, user_id } = await auth.api.login(formData.get("email"), formData.get("password"));
			auth.login(token, user_id);
			goBack();
		} catch (error) {
			/**
			 * TODO: We should be able to get response back, and read a message
			 * from the server to present here
			 */
			setError("Failed to login.");
		}
	}

	return (
		<main className={style.Login}>
			<Card>
				<h1>Login</h1>
				
				<form action={login}>
					<label htmlFor={emailId}>Email address:</label>
					<input type="email" name="email" id={emailId} autoComplete="off"/>

					<label htmlFor={passwordId}>Password:</label>
					<input type="password" name="password" id={passwordId} required/>

					<input type="submit" value="Login"/>
				</form>

				{/* TODO: Style this */}
				{error && <p role="alert" className={style.error}>{error}</p>}

				<a href="#">Trouble logging in?</a>
			</Card>
		</main>
	);
}
