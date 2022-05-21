import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Certificate from "./pages/Certificate";
import AccountMenu from "./components/AccountMenu";

function App() {
	return (
		<div className="h-100">
			<header>
				<nav className="row navbar navbar-light bg-light shadow-sm vw-100">
					<div className="container-fluid col">
						<span className="navbar-brand mb-0 h1">Navbar</span>
					</div>

					<div className="dropdown col-2 ps-4">
						<AccountMenu />
					</div>
				</nav>
			</header>

			<div className="position-relative h-custom">
				<div id="side-bar" className="d-inline-block border-end h-100">
					<Sidebar />
				</div>

				<div
					id="main"
					className="d-inline-block position-absolute top-0"
				>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/certificate" element={<Certificate />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
