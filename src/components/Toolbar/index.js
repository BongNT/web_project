import React, { useState } from "react";
import ReactDOM from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Toolbar() {
	const [selected, setSelected] = useState(false);
	function createDelBtn() {
		if (
			document.querySelector(
				"#content .MuiDataGrid-footerContainer > div:first-child"
			).innerHTML != ""
		) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}
	return (
		<Stack direction="row" spacing={60} className="pt-3 pb-3">
			<Button variant="outline" disabled={selected} className="" vis>
				<DeleteIcon />
			</Button>
			<Button variant="contained">
				<AddIcon /> Thêm mới
			</Button>
		</Stack>
	);
}
