import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";

let AuthContext = createContext(true);

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	let [user, setUser] = useState(true);

	function login(callback) {
		// of course the value will be different once backend exists
		setUser(1);
		callback();
	}

	function logout(callback) {
		setUser(null);
		callback();
	}

	const value = { user, login, logout };
	return <AuthContext value={value}>{children}</AuthContext>;
}

export function RequireAuth({ children }) {
	const auth = useContext(AuthContext);
	const location = useLocation();

	if (!auth.user)
		return <Navigate to="/login" state={{ from: location }} replace/>;

	return children;
}
