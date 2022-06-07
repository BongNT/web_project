import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
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
import CertificateContext from "../contexts/CertificateProvider";
import { height } from "@mui/system";

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

	const {
		auth
	} = React.useContext(CertificateContext);
	
	const dataRef = React.useRef();
	React.useEffect(
		() => async () => {
			const response = await fetch(
				"http://127.0.0.1:8000/certificates/statistic",
				{
					headers: { Authorization: `bearer ${auth.token}` },
				}
			).then((response) => response.json())
			.then((data) => {
				dataRef.current = data;
			}
			);
	}, []);


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
					<Typography variant="h6" noWrap component="div"  > 
						<Link to = "/" style={{color: "white"}}> Homepage </Link>
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
				<Box style={{height:500}}>
						<div> Tổng giấy chứng nhận: {dataRef.current.total} </div>
						<div> Giấy chứng nhận còn hạn: {dataRef.current.valid} </div>
						<div> Giấy chứng nhận hết hạn: {dataRef.current.expired} </div>
						<div> Giấy chứng nhận bị thu hồi: {dataRef.current.revoked} </div>
				</Box>
				
				<Toolbar />
				<Outlet />
				<footer className="border-top" style={{ textAlign: "center" }}>
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
	);
}

export default Home;
