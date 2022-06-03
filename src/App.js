import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import User from "./pages/User";
import Certificate from "./pages/Certificate";
import MyAccount from "./pages/MyAccount";
import RoleContext, { RoleProvider } from "./contexts/RoleProvider";
import Unauthorized from "./components/Unauthorized";

export default function App() {
	const ROLES = React.useContext(RoleContext);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="login" element={<Login />} />
				<Route
					element={
						<RequireAuth
							allowedRoles={[
								ROLES.Default_admin,
								ROLES.Admin,
								ROLES.Manager,
							]}
						/>
					}
				>
					<Route path="/" element={<Home />}>
						<Route
							element={
								<RequireAuth
									allowedRoles={[
										ROLES.Default_admin,
										ROLES.Admin,
									]}
								/>
							}
						>
							<Route path="user" element={<User />} />
						</Route>
						<Route path="certificate" element={<Certificate />} />
						<Route path="my-account" element={<MyAccount />} />
						<Route path="unauthorized" element={<Unauthorized />} />
					</Route>
				</Route>
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}
