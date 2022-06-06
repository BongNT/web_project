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
		width: 270,
	},
	{
		field: "start_date",
		headerName: "Ngày bắt đầu",
		headerAlign: "center",
		align: "center",
		width: 270,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "end_date",
		headerName: "Ngày kết thúc",
		headerAlign: "center",
		align: "center",
		width: 270,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "result",
		headerName: "Kết quả",
		headerAlign: "center",
		align: "center",
		width: 276,
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
		facilities,
		setFacilities,
	} = React.useContext(InspectionContext);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/facilities/", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setFacilities(data);
			});
	}, []);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/inspections/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();
			console.log(data);
			data.forEach((row) => {
				row.result === 1
					? (row.result = "Đang kiểm tra")
					: row.result === 2
					? (row.result = "Đạt chuẩn")
					: row.result === 3
					? (row.result = "Không đạt chuẩn")
					: (row.result = "Chưa kiểm tra");
				row.name = row.facility_inspection.name;
			});
			setRows(data);
			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: "34.375rem" }}>
			<Typography variant="h6" className="p-4 pt-3 pb-3">
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