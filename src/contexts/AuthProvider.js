import React from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
	const [auth, setAuth] = useAuth();

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
