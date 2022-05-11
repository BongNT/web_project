import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Certificate from "./pages/Certificate";

function App() {
	return (
		<div className="h-100">
			<header>
				<nav className="navbar navbar-light bg-light">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1">Navbar</span>
					</div>
				</nav>
			</header>

			<div className="row gx-0 h-100">
				<div id="side-bar" className="col-3 border">
					<Sidebar />
				</div>

				<div className="col-9">
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
