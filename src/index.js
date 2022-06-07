import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import { UserProvider } from "./contexts/UserProvider";
import { SampleProvider } from "./contexts/SampleProvider";
import Compose from "./components/Compose";
import { ManagerProvider } from "./contexts/ManagerProvider";
import { FacilityProvider } from "./contexts/FacilityProvider";
import { InspectionProvider } from "./contexts/InspectionProvider";
import { CertificateProvider } from "./contexts/CertificateProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Compose
			components={[
				BrowserRouter,
				AuthProvider,
				UserProvider,
				SampleProvider,
				ManagerProvider,
				FacilityProvider,
				InspectionProvider,
				CertificateProvider,
			]}
		>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</Compose>
	</React.StrictMode>
);
