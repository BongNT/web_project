import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/InspectionModal";
import InspectionContext from "../contexts/InspectionProvider";

const columns = [
	{
		field: "name",
		headerName: "Tên cơ sở",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "start_date",
		headerName: "Ngày bắt đầu",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "end_date",
		headerName: "Ngày kết thúc",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "result",
		headerName: "Kết quả",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
];

export default function Inspection() {
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
	} = React.useContext(InspectionContext);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/inspections/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();

			data.forEach((row) => {
				row.result === 1
					? (row.result = "Đang kiểm tra")
					: row.result === 2
					? (row.result = "Đạt chuẩn")
					: (row.result = "Không đạt chuẩn");
				row.name = row.facility_inspection.name;
			});
			setRows(data);
			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Thông tin thanh tra
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