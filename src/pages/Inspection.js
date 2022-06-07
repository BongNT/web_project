import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import AlertModal from "../components/Modal/AlertModal";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/InspectionModal";
import { AlertContext } from "../contexts/AlertProvider";
import InspectionContext from "../contexts/InspectionProvider";

const columns = [
	{
		field: "id",
		headerName: "Số",
		headerAlign: "center",
		align: "center",
		width: 110,
	},
	{
		field: "name",
		headerName: "Tên cơ sở",
		headerAlign: "center",
		align: "center",
		width: 240,
	},
	{
		field: "start_date",
		headerName: "Ngày bắt đầu",
		headerAlign: "center",
		align: "center",
		width: 240,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "end_date",
		headerName: "Ngày kết thúc",
		headerAlign: "center",
		align: "center",
		width: 240,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "result",
		headerName: "Kết quả",
		headerAlign: "center",
		align: "center",
		width: 256,
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
		setFacilities,
		setSgFacilities,
	} = React.useContext(InspectionContext);

	const { openAlert } = React.useContext(AlertContext);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/facilities/", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setFacilities(data);
			});
	}, []);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/inspections/suggest", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setSgFacilities(data);
			});
	}, []);

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
			{openAlert && <AlertModal type="success" message="Thành công" />}
		</Box>
	) : (
		<Box
			className="main"
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
