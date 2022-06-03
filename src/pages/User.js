import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import useAuth from "../hooks/useAuth";

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

	const { auth } = useAuth();
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch("http://127.0.0.1:8000/users/", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				data.forEach((row) => {
					if (row.type === 0) {
						row.type = "Siêu quản trị viên";
					} else if (row.type === 1) {
						row.type = "Quản trị viên";
					} else {
						row.type = "Quản lý";
					}
				});
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
