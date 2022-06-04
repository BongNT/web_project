import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";

export default function AccountMenu() {
	const { setAuth } = React.useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = async () => {
		setAuth({});
		navigate("/login");
	};

	const handleShowInfo = async () => {
		navigate("/my-account");
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Button
					onClick={handleClick}
					size="small"
					sx={{ ml: 2 }}
					aria-controls={open ? "account-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					variant="contained"
					className="align-self-end"
				>
					Nguyễn Trung Hiếu
					<ArrowDropDownIcon />
				</Button>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem
					style={{
						color: "rgba(0,0,0,0.9)",
						textDecoration: "none",
					}}
					onClick={handleShowInfo}
				>
					<Avatar /> Tài khoản của tôi
				</MenuItem>

				<Divider />

				<MenuItem
					style={{
						color: "rgba(0,0,0,0.9)",
						textDecoration: "none",
					}}
					onClick={handleLogout}
				>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Đăng xuất
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}