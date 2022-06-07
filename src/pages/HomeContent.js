import React from "react";
import { Box } from "@mui/material";

export default function HomeContent() {
	return (
		<Box
			className="main"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "34.375rem",
			}}
		>
			<img
				className="w-100 h-100"
				src="http://localhost:3000/assets/image/test_img.jpg"
			/>
		</Box>
	);
}
