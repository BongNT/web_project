import React from "react";
import { LinkList } from "../List";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";

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
			title: "Cơ sở sản xuất",
			items: [{ id: 1, name: "Giấy chứng nhận", link: "/home" }],
		},
		{
			id: 2,
			title: "Thanh tra, kiểm tra",
			items: [
				{ id: 1, name: "Kế hoạch", link: "/home" },
				{ id: 2, name: "Mẫu kiểm tra", link: "/certificate" },
				{ id: 3, name: "Kết quả thanh tra", link: "/certificate" },
			],
		},
		{
			id: 3,
			title: "Phân quyền",
			items: [
				{ id: 1, name: "Cán bộ", link: "/home" },
				{ id: 2, name: "Địa bàn", link: "/certificate" },
			],
		},
	];

	const [expanded, setExpanded] = React.useState();

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const list = objs.map((obj) => (
		<Accordion
			expanded={expanded === obj.id}
			onChange={handleChange(obj.id)}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{obj.title}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<LinkList list={obj.items} />
			</AccordionDetails>
		</Accordion>
	));
	return <div>{list}</div>;
}
