import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { API, HTTPUnauthorisedError } from "#/api";

let AuthContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [api, setApi] = useState(() => new API(localStorage.getItem("token")));
	const [id, setId] = useState(null);
	const [error, setError] = useState(null);

	// The browser seems to sort out the ID naming conflict
	function login(token, id) {
		localStorage.setItem("token", token);
		setApi(new API(token));
		setId(id);
	}

	function logout() {
		localStorage.removeItem("token");
		setApi(new API(null));
		setId(null);
	}

	/**
	 * If we already have a token set when the app first loads, then request our user ID.
	 * This also checks token validity. If we get a 401 back, then we unset our token and
	 * prompt for login again.
	 */
	useEffect(() => {
		if (!api.token())
			return;

		api.getUser("me")
			.then(user => setId(user.id))
			.catch(error => setError(error));
	}, []);

	/**
	 * The stored token must've expired or something, so the user needs to log in again.
	 * We do this check here and not in the effect because we need thrown exceptions to
	 * hit the error boundary.
	 */
	if (error instanceof HTTPUnauthorisedError) {
		logout();
		setError(null); // Prevents infinite loop
	} else if (error) {
		throw error;
	}

	return <AuthContext value={{ api, id, login, logout }}>{children}</AuthContext>;
}

export function RequireAuth({ children }) {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.api.token())
		return <Navigate to="/login" state={{ from: location }} replace/>;

	// TODO: You'd really check roles here too before showing a 401 or something
	if (!auth.id)
		return;

	return children;
}
