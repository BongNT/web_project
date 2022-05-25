import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import SignIn from "./pages/SignIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<App />} />
				<Route path="/sign-in" element={<SignIn />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
