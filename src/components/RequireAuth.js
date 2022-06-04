import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";

export default function RequireAuth({ allowedRoles }) {
	const { auth } = React.useContext(AuthContext);
	const location = useLocation();

	return allowedRoles.includes(auth.role) ? (
		<Outlet />
	) : auth.user ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}
