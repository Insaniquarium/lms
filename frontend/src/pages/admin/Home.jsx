import { useTitle, useApi } from "#/hooks";

export function Home() {
	const [user, req] = useApi(api => api.getUser("me"));

	useTitle(() => "Home");

	if (req.pending)
		return;

	return (
		<div className="page">
			<h1>Welcome back, {user.first_name}!</h1>
			{/* TODO: recent completion card */}
			<p>Begin by choosing an option on the navigation bar.</p>
		</div>
	);
}
