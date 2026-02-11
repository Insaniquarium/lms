import { useEffect, useState } from "react";
import { API } from "./api";
import { useAuth } from "./auth";

export function useTitle(callback, dependencies = []) {
	useEffect(() => {
		document.title = callback() + " - LMS";
	}, dependencies);
}

export function useApi(callback, dependencies = []) {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(true);
	const {api} = useAuth();

	useEffect(() => {
		callback(api)
			.then(value => { setResponse(value); setLoading(false); })
			.catch(error => { throw error; });
	}, dependencies);

	return [response, loading];
}
