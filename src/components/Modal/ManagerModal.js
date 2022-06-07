import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import ManagerContext from "../../contexts/ManagerProvider";

function AddModal() {
	const {
		auth,
		openAddModal,
		setRows,
		setOpenAddModal,
		districts,
		managers,
	} = React.useContext(ManagerContext);

	const [manager, setManager] = React.useState(null);

	const [district, setDistrict] = React.useState(null);

	const handleAdd = async (event) => {
		event.preventDefault();

		await fetch("http://127.0.0.1:8000/managers/register_district", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				manager_id: manager.id,
				district_id: district.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response.detail))
			.then(() => {
				fetch("http://127.0.0.1:8000/managers/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.districts_name = "";
							row.districts.forEach((element) => {
								row.districts_name += element.name + ", ";
							});
						});
						setRows(data);

						//reset dialog
						setManager(null);
						setDistrict(null);
					});
			});
		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setManager(null);
		setDistrict(null);
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm địa bàn cho quản lý</DialogTitle>
			<DialogContent>
				<Autocomplete
					className="mb-3"
					value={manager}
					onChange={(event, newValue) => {
						setManager(newValue);
					}}
					options={managers}
					autoHighlight
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Quản lý"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
				<Autocomplete
					value={district}
					onChange={(event, newValue) => {
						setDistrict(newValue);
					}}
					options={districts}
					autoHighlight
					groupBy={(option) => option.province.name}
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Địa bàn"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					<CancelIcon color="error" className="me-1" /> Hủy bỏ
				</Button>
				<Button onClick={handleAdd}>
					<AddIcon className="me-1" /> Thêm
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function EditModal() {
	const {
		auth,
		openEditModal,
		setOpenEditModal,
		setRows,
		idDataRef,
		userNameRef,
		districtRef,
		districts,
	} = React.useContext(ManagerContext);

	const [editInfo, setEditInfo] = React.useState({
		manager_id: idDataRef.current,
	});

	const [oldDistrict, setOldDistrict] = React.useState(null);
	const [editDistrict, setEditDistrict] = React.useState(null);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, district_id: editDistrict?.id });
	}, [editDistrict]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, old_district_id: oldDistrict?.id });
	}, [oldDistrict]);

	const handleChange = async (event) => {
		event.preventDefault();

		await fetch("http://127.0.0.1:8000/managers/update_district", {
			method: "PUT",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editInfo),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setEditInfo({ manager_id: idDataRef.current });
			})
			.then(() => {
				fetch("http://127.0.0.1:8000/managers/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.districts_name = "";
							row.districts.forEach((element) => {
								row.districts_name += element.name + ", ";
							});
						});
						setRows(data);
					});
			});
		setOpenEditModal(false);
	};

	const handleClose = () => {
		setOpenEditModal(false);
	};

	return (
		<Dialog open={openEditModal} onClose={handleClose}>
			<DialogTitle>
				Sửa địa bàn của quản lý {userNameRef.current}
			</DialogTitle>
			<DialogContent>
				<Autocomplete
					className="mb-3"
					value={oldDistrict}
					onChange={(event, newValue) => {
						setOldDistrict(newValue);
					}}
					options={districtRef.current}
					autoHighlight
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Địa bàn cũ"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
				<Autocomplete
					value={editDistrict}
					onChange={(event, newValue) => {
						setEditDistrict(newValue);
					}}
					options={districts}
					autoHighlight
					groupBy={(option) => option.province.name}
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Địa bàn mới"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					<CancelIcon className="me-1" color="error" /> Hủy bỏ
				</Button>
				<Button onClick={handleChange}>
					<SaveIcon className="me-1" /> Lưu
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function DeleteModal() {
	const {
		auth,
		setRows,
		idDataRef,
		openDeleteModal,
		setOpenDeleteModal,
		userNameRef,
		districtRef,
	} = React.useContext(ManagerContext);

	const [deleteDistrict, setDeleteDistrict] = React.useState(null);
	console.log(districtRef.current);
	const handleDelete = async () => {
		await fetch(`http://127.0.0.1:8000/managers/delete_district`, {
			method: "DELETE",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				manager_id: idDataRef.current,
				district_id: deleteDistrict.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
				fetch("http://127.0.0.1:8000/managers/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.districts_name = "";
							row.districts.forEach((element) => {
								row.districts_name += element.name + ", ";
							});
						});
						setRows(data);
					});
			});
		setOpenDeleteModal(false);
	};
	return (
		<Dialog
			open={openDeleteModal}
			onClose={() => setOpenDeleteModal(false)}
		>
			<DialogTitle>
				Xóa địa bàn của quản lý {userNameRef.current}
			</DialogTitle>
			<DialogContent>
				<Autocomplete
					className="mb-3"
					value={deleteDistrict}
					onChange={(event, newValue) => {
						setDeleteDistrict(newValue);
					}}
					options={districtRef.current}
					autoHighlight
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Địa bàn cần xóa"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpenDeleteModal(false)}>
					<CancelIcon className="me-1" /> Kiểm tra lại
				</Button>
				<Button onClick={handleDelete}>
					<DeleteIcon className="me-1" color="error" /> Xóa
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export { AddModal, EditModal, DeleteModal };
