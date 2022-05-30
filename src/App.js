import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toolbar, IconButton, AppBar, Drawer, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import User from "./pages/User";
import Certificate from "./pages/Certificate";
import Sidebar from "./components/Sidebar";
import AccountMenu from "./components/AccountMenu";
import MyAccount from "./pages/MyAccount";

const drawerWidth = 240;
function App(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box className="h-100" sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Responsive drawer
					</Typography>
					<AccountMenu />
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					<Sidebar />
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					<Sidebar />
				</Drawer>
			</Box>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					paddingLeft: 3,
					paddingRight: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<Routes>
					<Route path="/user" element={<User />} />
					<Route path="/certificate" element={<Certificate />} />
					<Route path="/my-account" element={<MyAccount />} />
				</Routes>
				<footer className="border-top">Chả biết viết gì</footer>
			</Box>
		</Box>
	);
}

export default App;