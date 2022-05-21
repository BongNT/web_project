import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Lists(prop) {
	const list = prop.list.map((item) => (
		<li className={prop.classLi}>
			<a className={prop.classA}>
				<i className={prop.classIcon}></i>
				{item}
			</a>
		</li>
	));
	return <ul className={prop.classUl}>{list}</ul>;
}

function ListItemLink(props) {
	const { icon, primary, to } = props;

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
		<ListItem button component={renderLink}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			<ListItemText primary={primary} />
		</ListItem>
	);
}

ListItemLink.propTypes = {
	icon: PropTypes.element,
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

function LinkList(prop) {
	const list = prop.list.map((item) => (
		<ListItemLink
			to={item.link}
			primary={item.name}
			icon={<ArrowRightIcon />}
		/>
	));
	return <List>{list}</List>;
}

export { Lists, LinkList };
