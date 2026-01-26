import { Link } from "react-router";

export default function NotFound() {
	return (
		<>
			<p>Page not found. Please check for any mistakes in the link, or <Link to="/help">contact us.</Link></p>
		</>
	);
}
