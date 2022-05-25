import { Box, Typography } from "@mui/material";
import { randomId } from "@mui/x-data-grid-generator";
import DataTable from "../components/DataTable";

const data = [
	{
		id: randomId(),
		name: "string",
		email: "string",
		type: "admin",
	},
	{
		id: randomId(),
		name: "admin",
		email: "string",
		type: "admin",
	},
	{
		id: randomId(),
		name: "121",
		email: "string",
		type: "manager",
	},
	{
		id: randomId(),
		name: "b4",
		email: "string",
		type: "manager",
	},
	{
		id: randomId(),
		name: "b5",
		email: "string",
		type: "manager",
	},
	{
		id: randomId(),
		name: "t",
		email: "string@abc.xyz",
		type: "manager",
	},
];

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

export default function Home() {
	return (
		<Box sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Người dùng
			</Typography>
			<DataTable data={data} columns={columns} />
		</Box>
	);
}
