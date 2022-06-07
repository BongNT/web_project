import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function HomeContent() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: 550,
			}}
		>
			<CircularProgress />
		</Box>
	);
}
