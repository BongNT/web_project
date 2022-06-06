import { Box } from "@mui/material";
import React from "react";

export default function MyAccount() {
	const { auth } = React.useContext();

	React.useEffect(() => {
		fetch("https://127.0.0.1:8000/me/info", {
			headers: { Authorization: `bearer ${auth.token}` },
		}).then((response) => response.json());
	});

	return (
		<Box sx={{ height: "34.375rem" }}>
			<Box></Box>
		</Box>
	);
}
