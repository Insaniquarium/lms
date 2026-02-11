import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { API } from "#/api";

let AuthContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [api, setApi] = useState(new API(localStorage.getItem("token")));
	const [id, setId] = useState(null);

	useEffect(() => {
		api.getUser("me").then(user => setId(user.id));
	}, []);

	function login(api, id) {
		setApi(api);
		setId(id);
		localStorage.setItem("token", api.token());
	}

	function logout() {
		localStorage.removeItem("token");
	}

	const value = { api, id, login };
	return <AuthContext value={value}>{id && children}</AuthContext>;
}

export function RequireAuth({ children }) {
	const auth = useContext(AuthContext);
	const location = useLocation();

	if (!auth.api.authenticated())
		return <Navigate to="/login" state={{ from: location }} replace/>;

	return children;
}
