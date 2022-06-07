import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/SampleModal";
import SampleContext from "../contexts/SampleProvider";

const columns = [
	{
		field: "id",
		headerName: "Số",
		headerAlign: "center",
		align: "center",
		width: 130,
	},
	{
		field: "inspection_id",
		headerName: "Số thanh tra",
		headerAlign: "center",
		align: "center",
		width: 130,
	},
	{
		field: "inspection_agency",
		headerName: "Đơn vị giám định",
		headerAlign: "center",
		align: "center",
		width: 300,
	},
	{
		field: "status",
		headerName: "Trạng thái",
		headerAlign: "center",
		align: "center",
		width: 200,
	},
	{
		field: "result_date",
		headerName: "Ngày nhận kết quả",
		headerAlign: "center",
		align: "center",
		width: 256,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "result",
		headerName: "Kết quả",
		headerAlign: "center",
		align: "center",
		width: 200,
	},
];

export default function Sample() {
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
		setInspections,
	} = React.useContext(SampleContext);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/inspections/", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setInspections(data);
			});
	}, []);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/samples/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();

			data.forEach((row) => {
				row.status === 1
					? (row.status = "Đang gửi đi")
					: row.status === 2
					? (row.status = "Đang xử lý")
					: (row.status = "Hoàn tất");
				row.inspection_id = row.in_inspection.id;
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: "34.375rem" }}>
			<Typography variant="h6" className="p-4 pt-3 pb-3">
				Mẫu kiểm tra
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
