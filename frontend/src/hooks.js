import { useEffect, useState } from "react";
import { useAuth } from "./auth";

export function useTitle(callback, dependencies = []) {
	useEffect(() => {
		document.title = callback() + " - LMS";
	}, dependencies);
}

export function useApi(callback, dependencies = []) {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {api} = useAuth();

	useEffect(() => {
		let cancelled = false;
		setLoading(true); // otherwise if dependencies change it could still be false, no?
		setError(null);

		callback(api)
			.then(value => { if (!cancelled) { setResponse(value); setLoading(false); }})
			.catch(error => { if (!cancelled) { setError(error); setLoading(false); }});

		return () => { cancelled = true; };
	}, dependencies);

	return [response, loading, error];
}
