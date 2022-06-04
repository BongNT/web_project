import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/UserModal";
import AuthContext from "../contexts/AuthProvider";
import UserContext, { UserProvider } from "../contexts/UserProvider";

const columns = [
	{
		field: "name",
		headerName: "Tên",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "email",
		headerName: "Thư điện tử",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "type",
		headerName: "Chức vụ",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
];

export default function User() {
	const {
		auth,
		fetchOk,
		rows,
		setRows,
		openAddModal,
		openEditModal,
		openDeleteModal,
		setOpenAddModal,
		handleEditClick,
		handleDeleteClick,
		setFetchOk,
	} = React.useContext(UserContext);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/users/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();

			data.forEach((row) => {
				row.type === 0
					? (row.type = "Quản trị viên cấp cao")
					: row.type === 1
					? (row.type = "Quản trị viên")
					: (row.type = "Quản lý");
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Người dùng
			</Typography>
			<DataTable
				rows={rows}
				columns={columns}
				setOpenAddModal={setOpenAddModal}
				handleEditClick={handleEditClick}
				handleDeleteClick={handleDeleteClick}
			/>
			{openAddModal && <AddModal />}
			{openEditModal && <EditModal />}
			{openDeleteModal && <DeleteModal />}
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
