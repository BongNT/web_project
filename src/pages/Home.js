import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Toolbar, IconButton, AppBar, Drawer, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import User from "./User";
import Certificate from "./Certificate";
import Sidebar from "../components/Sidebar";
import AccountMenu from "../components/AccountMenu";
import MyAccount from "./MyAccount";
import RequireAuth from "../components/RequireAuth";
import Unauthorized from "../components/Unauthorized";
import { alignProperty } from "@mui/material/styles/cssUtils";

const drawerWidth = 240;
function Home(props) {
	//responsive
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
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<Outlet />
				<footer className="border-top" style={{textAlign:"center"}}>
					<ul class="footer-nav">
						<span> <a href="https://www.w3schools.com/REACT/default.asp">About Us</a> </span>
                        <span> <a href="https://www.w3schools.com/REACT/default.asp">Contact Us</a> </span>
                        <span> <a href="https://www.w3schools.com/REACT/default.asp">Privacy Policy</a> </span>
                        <span> <a href="https://www.w3schools.com/REACT/default.asp">Terms</a> </span>
                        <span> <a href="https://www.w3schools.com/REACT/default.asp">Report a Bug</a> </span>
                        <span> <a href="https://www.w3schools.com/REACT/default.asp">FAQ</a> </span>
                    </ul>
					<p class="footer-copyright">
						<small>©2022 DevTeamINT. All contents are copyright of authors.</small> 
					</p>
				</footer>
			</Box>
		</Box>
	);
}

export default Home;
