import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/SampleModal";
import SampleContext from "../contexts/SampleProvider";
import useAuth from "../hooks/useAuth";

const columns = [
	{
		field: "id",
		headerName: "Số",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "inspection_agency",
		headerName: "Đơn vị giám định",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "status",
		headerName: "Trạng thái",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "result_date",
		headerName: "Ngày nhận kết quả",
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
	} = React.useContext(SampleContext);

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
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
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
