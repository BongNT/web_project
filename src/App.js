import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import User from "./pages/User";
import Certificate from "./pages/Certificate";
import Manager from "./pages/Manager";
import Inspection from "./pages/Inspection";
import Sample from "./pages/Sample";
import MyAccount from "./pages/MyAccount";
import Unauthorized from "./components/Unauthorized";
import Facility from "./pages/Facility";
import HomeContent from "./pages/HomeContent";

const ROLES = {
	Default_admin: 0,
	Admin: 1,
	Manager: 2,
};

export default function App() {
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
						<Route path="/" element={<HomeContent />} />

						<Route path="facility" element={<Facility />} />
						<Route path="certificate" element={<Certificate />} />

						<Route path="inspection" element={<Inspection />} />
						<Route path="sample" element={<Sample />} />

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
							<Route path="manager" element={<Manager />} />
						</Route>

						<Route path="my-account" element={<MyAccount />} />
						<Route path="unauthorized" element={<Unauthorized />} />
					</Route>
				</Route>
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}
