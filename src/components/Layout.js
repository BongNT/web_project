import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<main className="h-100">
			<Outlet />
		</main>
	);
}
