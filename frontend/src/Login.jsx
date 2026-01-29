import Card from "./Card"
import style from "./Login.module.scss";

export default function Login() {
	function login(formData) {

	}

	return (
		<main className={style.Login}>
			<Card>
				<h1>Login</h1>
				<form action={login}>
					<input type="email" name="email"/>
					<input type="password" name="password"/>
					<input type="submit" value="Login"/>
				</form>
			</Card>
		</main>
	);
}
