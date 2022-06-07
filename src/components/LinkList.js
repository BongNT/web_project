import React from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { HomeContext } from "../pages/Home";

function ListItemLink(props) {
	const { icon, primary, to } = props;
	const { setMobileOpen } = React.useContext(HomeContext);

	function handleNavigate(url) {
		setMobileOpen(false);
	}
	const renderLink = React.useMemo(
		() =>
			React.forwardRef(function Link(itemProps, ref) {
				return (
					<RouterLink
						to={to}
						ref={ref}
						{...itemProps}
						role={undefined}
					/>
				);
			}),
		[to]
	);

	return (
		<ListItem button component={renderLink} onClick={handleNavigate}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			<ListItemText primary={primary} />
		</ListItem>
	);
}

export default function LinkList(prop) {
	const list = prop.list.map((item) => (
		<ListItemLink
			key={item.id}
			to={item.link}
			primary={item.name}
			icon={<ArrowRightIcon />}
		/>
	));
	return <List>{list}</List>;
}
