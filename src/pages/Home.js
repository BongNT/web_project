import React from "react";
import { Outlet } from "react-router-dom";
import { Toolbar, IconButton, AppBar, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import AccountMenu from "../components/AccountMenu";
const drawerWidth = 240;

const HomeContext = React.createContext();

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
		<HomeContext.Provider value={{ setMobileOpen }}>
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
					<footer
						id="footer"
						className="border-top"
						style={{ textAlign: "center" }}
					>
						<ul className="footer-nav">
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									About Us
								</a>{" "}
							</span>
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									Contact Us
								</a>{" "}
							</span>
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									Privacy Policy
								</a>{" "}
							</span>
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									Terms
								</a>{" "}
							</span>
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									Report a Bug
								</a>{" "}
							</span>
							<span>
								{" "}
								<a href="https://www.w3schools.com/REACT/default.asp">
									FAQ
								</a>{" "}
							</span>
						</ul>
						<p className="footer-copyright">
							<small>
								©2022 DevTeamINT. All contents are copyright of
								authors.
							</small>
						</p>
					</footer>
				</Box>
			</Box>
		</HomeContext.Provider>
	);
}

export default Home;

export { HomeContext };
