import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/ManagerModal";
import AuthContext from "../contexts/AuthProvider";
import ManagerContext from "../contexts/ManagerProvider";
import useAuth from "../hooks/useAuth";

const columns = [
	{
		field: "name",
		headerName: "Tên",
		headerAlign: "center",
		align: "center",
		width: 250,
	},
	{
		field: "districts_name",
		headerName: "Địa bàn quản lý",
		headerAlign: "center",
		align: "center",
		width: 800,
		// renderCell: renderCellExpand,
	},
];

export default function Manager() {
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
	} = React.useContext(ManagerContext);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/managers/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();
			console.log(data);
			data.map((row) => {
				row.districts_name = "";
				row.districts.forEach((element) => {
					row.districts_name += element.name + ", ";
				});
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Phụ trách địa bàn
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
