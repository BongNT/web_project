import { Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import DataTable from "../components/DataTable";
import {
	AddModal,
	EditModal,
	DeleteModal,
} from "../components/Modal/CertificateModal";
import CertificateContext from "../contexts/CertificateProvider";

const columns = [
	{
		field: "id",
		headerName: "Số",
		headerAlign: "center",
		align: "center",
		width: 130,
	},
	{
		field: "name",
		headerName: "Cơ sở",
		headerAlign: "center",
		align: "center",
		width: 240,
	},
	{
		field: "issue_date",
		headerName: "Ngày cấp",
		headerAlign: "center",
		align: "center",
		width: 240,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "expiry_date",
		headerName: "Ngày hết hạn",
		headerAlign: "center",
		align: "center",
		width: 240,
		type: "date",
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: "status",
		headerName: "Trạng thái",
		headerAlign: "center",
		align: "center",
		width: 236,
	},
];

export default function Certificate() {
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
	} = React.useContext(CertificateContext);

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
			const response = await fetch(
				"http://127.0.0.1:8000/certificates/",
				{
					headers: { Authorization: `bearer ${auth.token}` },
				}
			);
			const data = await response.json();

			data.forEach((row) => {
				row.status === 1
					? (row.status = "Còn hiệu lực")
					: row.status === 2
					? (row.status = "Hết hạn")
					: (row.status = "Bị thu hồi");
				row.name = row.facility.name;
			});
			setRows(data);

			setFetchOk(true);
		},
		[]
	);
	return fetchOk ? (
		<Box className="main" sx={{ height: "34.375rem" }}>
			<Typography variant="h6" className="p-4 pt-3 pb-3">
				Thông tin chứng nhận
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
