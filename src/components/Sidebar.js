import React from "react";
import LinkList from "./LinkList";
import { styled } from "@mui/material/styles";
import { Toolbar, Divider } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../css/Sidebar.css";
import { AccountTree, Home, HomeWork, Work } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { HomeContext } from "../pages/Home";

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
	({ theme }) => ({
		backgroundColor:
			theme.palette.mode === "dark"
				? "rgba(255, 255, 255, .05)"
				: "rgba(0, 0, 0, .03)",
	})
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Sidebar() {
	const objs = [
		{
			id: 1,
			title: "Cơ sở",
			icon: <HomeWork className="me-3" />,
			items: [
				{ id: 1, name: "Thông tin cơ sở", link: "/facility" },
				{ id: 2, name: "Giấy chứng nhận", link: "/certificate" },
			],
		},
		{
			id: 2,
			title: "Thanh tra",
			icon: <Work className="me-3" />,
			items: [
				{ id: 1, name: "Thông tin thanh tra", link: "/inspection" },
				{ id: 2, name: "Mẫu kiểm tra", link: "/sample" },
			],
		},
		{
			id: 3,
			title: "Phân quyền",
			icon: <AccountTree className="me-3" />,
			items: [
				{ id: 1, name: "Người dùng", link: "/user" },
				{ id: 2, name: "Địa bàn", link: "/manager" },
			],
		},
	];

	const [expanded, setExpanded] = React.useState();

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const navigate = useNavigate();

	const { setMobileOpen } = React.useContext(HomeContext);

	const handleNavigate = () => {
		setMobileOpen(false);
		navigate("/");
	};
	return (
		<div id="side-bar">
			<Toolbar
				onClick={handleNavigate}
				sx={{ backgroundColor: "rgba(0, 0, 0, .03)" }}
			>
				<Home className="me-3" />
				<Typography>
					<Link to="/" style={{ color: "#000" }}>
						Trang chủ
					</Link>
				</Typography>
			</Toolbar>
			<Divider />
			{objs.map((obj) => (
				<Accordion
					key={obj.id}
					expanded={expanded === obj.id}
					onChange={handleChange(obj.id)}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						{obj.icon}
						<Typography>{obj.title}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<LinkList list={obj.items} />
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
}
