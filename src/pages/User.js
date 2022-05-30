import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

const columns = [
	{
		field: "name",
		headerName: "Tên",
		headerAlign: "center",
		align: "center",
		editable: true,
		flex: 1,
	},
	{
		field: "email",
		headerName: "Thư điện tử",
		headerAlign: "center",
		align: "center",
		editable: true,
		flex: 1,
	},
	{
		field: "type",
		headerName: "Chức vụ",
		headerAlign: "center",
		align: "center",
		editable: true,
		flex: 1,
	},
];

export default function User() {
	const [fetchOk, setFetchOk] = useState(false);

	const [data, setData] = useState(null);
	useEffect(() => {
		fetch("http://localhost:3000/assets/data/data.json")
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setFetchOk(true);
			});
	}, []);
	return fetchOk ? (
		<Box id="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Người dùng
			</Typography>
			<DataTable data={data} columns={columns} />
		</Box>
	) : (
		<Box sx={{ display: "flex", height: 550 }}>
			<CircularProgress />
		</Box>
	);
}
