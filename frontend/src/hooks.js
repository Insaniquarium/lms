import { useEffect, useState } from "react";
import { useAuth } from "./auth";

export function useTitle(callback, dependencies = []) {
	useEffect(() => {
		document.title = callback() + " - LMS";
	}, dependencies);
}

export function useApi(callback, dependencies = []) {
	const [data, setData] = useState(null);
	const [pending, setPending] = useState(true);
	const [error, setError] = useState(null);
	const {api} = useAuth();

	function execute() {
		let cancelled = false;
		setPending(true); // otherwise if dependencies change it could still be false, no?
		setError(null);

		callback(api)
			.then(value => { if (!cancelled) { setData(value); setPending(false); }})
			.catch(error => { if (!cancelled) { setError(error); setPending(false); }});

		return () => { cancelled = true; };
	}

	useEffect(execute, dependencies);

	return [data, { pending, error, refetch: execute }];
}
