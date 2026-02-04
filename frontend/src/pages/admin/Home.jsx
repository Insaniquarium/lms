import { useTitle } from "#/hooks";

export function Home() {
	useTitle(() => "Home");

	return (
		<div className="page">
			<h1>Welcome back, Joseph!</h1>
			{/* TODO: recent completion card */}
			<p>Begin by choosing an option on the navigation bar.</p>
		</div>
	);
}
