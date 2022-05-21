import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";

export default function Toolbar() {
	return (
		<Stack
			direction="row"
			spacing={2}
			className="justify-content-center border-bottom w-100 p-3"
		>
			<Button variant="contained">
				<AddIcon /> Thêm mới
			</Button>
			<Button variant="contained">Chỉnh sửa</Button>
			<Button variant="contained" href="/add">
				Link
			</Button>
		</Stack>
	);
}
