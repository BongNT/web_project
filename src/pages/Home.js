import React from "react";
import Toolbar from "../components/Toolbar";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "name_user", headerName: "Name", width: 130 },
	{ field: "email", headerName: "Email", width: 130 },
	{
		field: "type",
		headerName: "Chức vụ",
		width: 130,
	},
	// {
	// 	field: "fullName",
	// 	headerName: "Full name",
	// 	description: "This column has a value getter and is not sortable.",
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params) =>
	// 		`${params.row.firstName || ""} ${params.row.lastName || ""}`,
	// },
];

const rows = [
	{
		id: 1,
		name_user: "string",
		email: "string",
		type: "default-admin",
	},
	{
		id: 2,
		name_user: "admin",
		email: "string",
		type: "default-admin",
	},
	{
		id: 3,
		name_user: "121",
		email: "string",
		type: "manager",
	},
	{
		id: 4,
		name_user: "b4",
		email: "string",
		type: "manager",
	},
	{
		id: 5,
		name_user: "b5",
		email: "string",
		type: "manager",
	},
	{
		id: 6,
		name_user: "t",
		email: "string@abc.xyz",
		type: "manager",
	},
];

export default function Home() {
	return (
		<div>
			<Toolbar />{" "}
			<div id="content" style={{ height: 500, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={9}
					rowsPerPageOptions={[5]}
					checkboxSelection
				/>
			</div>
		</div>
	);
}
