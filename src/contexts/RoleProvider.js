import React from "react";

const RoleContext = React.createContext();

export function RoleProvider({ children }) {
	const ROLES = {
		Default_admin: 0,
		Admin: 1,
		Manager: 2,
	};
	return (
		<RoleContext.Provider value={ROLES}>{children}</RoleContext.Provider>
	);
}

export default RoleContext;
