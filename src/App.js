import Sidebar from "./components/Sidebar";

function App() {
	return (
		<div>
			<header>
				<nav class="navbar navbar-light bg-light">
					<div class="container-fluid">
						<span class="navbar-brand mb-0 h1">Navbar</span>
					</div>
				</nav>
			</header>
			<div id="container">
				<div class="row">
					<div id="side-bar" class="col-3">
						<Sidebar />
					</div>
					<div class="col-9">Home</div>
				</div>
			</div>
		</div>
	);
}

export default App;
