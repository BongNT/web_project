import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/FacilityModal";
import FacilityContext from "../contexts/FacilityProvider";

const columns = [
	{
		field: "name",
		headerName: "Tên cơ sở",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "type",
		headerName: "Loại hình",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "district",
		headerName: "Địa chỉ",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
	{
		field: "phone_number",
		headerName: "Số điện thoại",
		headerAlign: "center",
		align: "center",
		flex: 1,
	},
];

export default function Facility() {
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
	} = React.useContext(FacilityContext);

	React.useEffect(
		() => async () => {
			const response = await fetch("http://127.0.0.1:8000/facilities/", {
				headers: { Authorization: `bearer ${auth.token}` },
			});
			const data = await response.json();
			console.log(data);
			data.forEach((row) => {
				row.type === 1
					? (row.type = "Sản xuất thực phẩm")
					: row.type === 2
					? (row.type = "Kinh doanh thực phẩm")
					: (row.type = "Sản xuất và kinh doanh thực phẩm");
				row.district = row.in_district.name;
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);

	return fetchOk ? (
		<Box className="main" sx={{ height: 550 }}>
			<Typography variant="h6" className="p-3">
				Thông tin cơ sở
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
