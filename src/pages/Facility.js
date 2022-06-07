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
		width: 200,
	},
	{
		field: "type",
		headerName: "Loại hình",
		headerAlign: "center",
		align: "center",
		width: 306,
	},
	{
		field: "district",
		headerName: "Địa chỉ",
		headerAlign: "center",
		align: "center",
		width: 350,
	},
	{
		field: "phone_number",
		headerName: "Số điện thoại",
		headerAlign: "center",
		align: "center",
		width: 230,
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
		districts,
		setDistricts,
	} = React.useContext(FacilityContext);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/managers/districts", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setDistricts(data);
			});
	}, []);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/facilities/", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				data.forEach((row) => {
					row.type === 1
						? (row.type = "Sản xuất thực phẩm")
						: row.type === 2
						? (row.type = "Kinh doanh thực phẩm")
						: (row.type = "Sản xuất và kinh doanh thực phẩm");
					districts?.forEach((address) => {
						if (address.id === row.in_district.id) {
							row.district = `${row.in_district.name}, ${address.province.name}`;
						}
					});
				});

				setRows(data);
				setFetchOk(true);
			});
	}, [districts]);

	return fetchOk ? (
		<Box className="main" sx={{ height: "34.375rem" }}>
			<Typography variant="h6" className="p-4 pt-3 pb-3">
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
