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
	Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import FacilityContext from "../../contexts/FacilityProvider";

function AddModal() {
	const { auth, openAddModal, setRows, setOpenAddModal, districts } =
		React.useContext(FacilityContext);

	const [name, setName] = React.useState("");
	const handleChangeName = (event) => setName(event.target.value);

	const [type, setType] = React.useState("");
	const handleChangeType = (event) => setType(event.target.value);

	const [phoneNumber, setPhoneNumber] = React.useState("");
	const handleChangePhoneNumber = (event) =>
		setPhoneNumber(event.target.value);

	const [valueAddress, setValueAddress] = React.useState(null);

	const handleAdd = async (event) => {
		event.preventDefault();
		await fetch("http://127.0.0.1:8000/facilities/register", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				type: type,
				district_id: valueAddress.id,
				phone_number: phoneNumber,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response.detail))
			.then(() => {
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
								: (row.type =
										"Sản xuất và kinh doanh thực phẩm");
							districts?.forEach((address) => {
								if (address.id === row.in_district.id) {
									row.district = `${row.in_district.name}, ${address.province.name}`;
								}
							});
						});
						setRows(data);

						//reset dialog
						setName("");
						setValueAddress(null);
						setType("");
						setPhoneNumber("");
					});
			});

		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setName("");
		setValueAddress(null);
		setType("");
		setPhoneNumber("");
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm cơ sở</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Tên cơ sở"
					variant="filled"
					value={name}
					onChange={handleChangeName}
				/>
				<FormControl variant="filled" fullWidth className="mb-3">
					<InputLabel>Loại hình</InputLabel>
					<Select value={type} onChange={handleChangeType}>
						<MenuItem value={1}>Sản xuất thực phẩm</MenuItem>
						<MenuItem value={2}>Kinh doanh thực phẩm</MenuItem>
						<MenuItem value={3}>
							Sản xuất và kinh doanh thực phẩm
						</MenuItem>
					</Select>
				</FormControl>
				<Autocomplete
					className="mb-3"
					value={valueAddress}
					onChange={(event, newValue) => {
						setValueAddress(newValue);
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
							label="Địa chỉ"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
				<TextField
					fullWidth
					label="Số điện thoại"
					variant="filled"
					value={phoneNumber}
					onChange={handleChangePhoneNumber}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>
					<CancelIcon color="error" className="me-1" /> Hủy bỏ
				</Button>
				<Button onClick={handleAdd}>
					<AddIcon className="me-1" /> Thêm mới
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
		nameRef,
		typeRef,
		districtRef,
		phoneNumberRef,
		districts,
	} = React.useContext(FacilityContext);

	const [editInfo, setEditInfo] = React.useState({ id: idDataRef.current });

	const [editName, setEditName] = React.useState(nameRef.current);
	const handleChangeName = (event) => {
		setEditName(event.target.value);
	};

	const [editType, setEditType] = React.useState(typeRef.current);
	const handleChangeType = (event) => {
		setEditType(event.target.value);
	};

	const [editDistrict, setEditDistrict] = React.useState(districtRef.current);

	const [editPhoneNumber, setEditPhoneNumber] = React.useState(
		phoneNumberRef.current
	);
	const handleChangePhoneNumber = (event) => {
		setEditPhoneNumber(event.target.value);
	};

	React.useEffect(() => {
		setEditInfo({ ...editInfo, name: editName });
	}, [editName]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, type: editType });
	}, [editType]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, district_id: editDistrict.id });
	}, [editDistrict]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, phone_number: editPhoneNumber });
	}, [editPhoneNumber]);

	const handleChange = async (event) => {
		event.preventDefault();
		await fetch("http://127.0.0.1:8000/facilities/update", {
			method: "PUT",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editInfo),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
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
								: (row.type =
										"Sản xuất và kinh doanh thực phẩm");
							districts?.forEach((address) => {
								if (address.id === row.in_district.id) {
									row.district = `${row.in_district.name}, ${address.province.name}`;
								}
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
			<DialogTitle>Sửa cơ sở {nameRef.current}</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Tên cơ sở"
					variant="filled"
					value={editName}
					onChange={handleChangeName}
				/>
				<FormControl variant="filled" fullWidth className="mb-3">
					<InputLabel>Loại hình</InputLabel>
					<Select value={editType} onChange={handleChangeType}>
						<MenuItem value={1}>Sản xuất thực phẩm</MenuItem>
						<MenuItem value={2}>Kinh doanh thực phẩm</MenuItem>
						<MenuItem value={3}>
							Sản xuất và kinh doanh thực phẩm
						</MenuItem>
					</Select>
				</FormControl>
				<Autocomplete
					className="mb-3"
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
							label="Địa chỉ"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
				<TextField
					fullWidth
					label="Số điện thoại"
					variant="filled"
					value={editPhoneNumber}
					onChange={handleChangePhoneNumber}
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
		rows,
		setRows,
		idDataRef,
		openDeleteModal,
		setOpenDeleteModal,
	} = React.useContext(FacilityContext);

	const handleDelete = async () => {
		await fetch(
			`http://127.0.0.1:8000/facilities/${idDataRef.current}/delete`,
			{
				method: "DELETE",
				headers: {
					Authorization: `bearer ${auth.token}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(response.detail);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		setOpenDeleteModal(false);
		setRows(rows.filter((row) => row.id !== idDataRef.current));
	};
	return (
		<Dialog
			open={openDeleteModal}
			onClose={() => setOpenDeleteModal(false)}
		>
			<DialogTitle>Bạn chắc chắn muốn xóa?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Bạn nên kiểm tra lại trước khi xóa!
				</DialogContentText>
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
