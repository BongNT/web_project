import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { RoleProvider } from "./contexts/RoleProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<RoleProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</RoleProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
