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
import CertificateContext from "../../contexts/CertificateProvider";

function AddModal() {
	const { auth, openAddModal, setRows, setOpenAddModal, facilities } =
		React.useContext(CertificateContext);

	const [issueDate, setIssueDate] = React.useState("");
	const handleChangeIssueDate = (event) => setIssueDate(event.target.value);

	const [expiryDate, setExpiryDate] = React.useState("");
	const handleChangeExpiryDate = (event) => setExpiryDate(event.target.value);

	const [valueFacility, setValueFacility] = React.useState(null);

	const handleAdd = async (event) => {
		event.preventDefault();
		await fetch("http://127.0.0.1:8000/certificates/create", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				issue_date: issueDate,
				expiry_date: expiryDate,
				facility_id: valueFacility.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
				fetch("http://127.0.0.1:8000/certificates/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.status === 1
								? (row.status = "Còn hiệu lực")
								: row.status === 2
								? (row.status = "Hết hạn")
								: (row.status = "Bị thu hồi");
							row.name = row.facility.name;
						});
						setRows(data);

						//reset dialog
						setIssueDate("");
						setExpiryDate("");
						setValueFacility(null);
					});
			});

		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setIssueDate("");
		setExpiryDate("");
		setValueFacility(null);
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm giấy chứng nhận</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày cấp"
					variant="filled"
					type="date"
					value={issueDate}
					onChange={handleChangeIssueDate}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày hết hạn"
					variant="filled"
					type="date"
					value={expiryDate}
					onChange={handleChangeExpiryDate}
					InputLabelProps={{ shrink: true }}
				/>
				<Autocomplete
					value={valueFacility}
					onChange={(event, newValue) => {
						setValueFacility(newValue);
					}}
					options={facilities}
					autoHighlight
					getOptionLabel={(option) => option.name}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Cơ sở"
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
		statusRef,
		expiryDateRef,
	} = React.useContext(CertificateContext);

	const [editInfo, setEditInfo] = React.useState({ id: idDataRef.current });

	const [editExpiryDate, setEditExpiryDate] = React.useState(
		expiryDateRef.current
	);
	const handleChangeExpiryDate = (event) => {
		setEditExpiryDate(event.target.value);
	};

	const [editStatus, setEditStatus] = React.useState(statusRef.current);
	const handleChangeStatus = (event) => {
		setEditStatus(event.target.value);
	};

	React.useEffect(() => {
		setEditInfo({ ...editInfo, expiry_date: editExpiryDate });
	}, [editExpiryDate]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, status: editStatus });
	}, [editStatus]);

	const handleChange = (event) => {
		event.preventDefault();

		fetch("http://127.0.0.1:8000/certificates/update", {
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
				setEditInfo({ id: idDataRef.current });
			})
			.then(() => {
				fetch("http://127.0.0.1:8000/certificates/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.status === 1
								? (row.status = "Còn hiệu lực")
								: row.status === 2
								? (row.status = "Hết hạn")
								: (row.status = "Bị thu hồi");
							row.name = row.facility.name;
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
				Sửa giấy chứng nhận số {idDataRef.current}
			</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày hết hạn"
					variant="filled"
					type="date"
					value={editExpiryDate}
					onChange={handleChangeExpiryDate}
					InputLabelProps={{ shrink: true }}
				/>
				<FormControl variant="filled" fullWidth className="mb-3">
					<InputLabel>Trạng thái</InputLabel>
					<Select value={editStatus} onChange={handleChangeStatus}>
						<MenuItem value={1}>Còn hiệu lực</MenuItem>
						<MenuItem value={2}>Hết hạn</MenuItem>
						<MenuItem value={3}>Bị thu hồi</MenuItem>
					</Select>
				</FormControl>
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
	} = React.useContext(CertificateContext);

	const handleDelete = async () => {
		await fetch(
			`http://127.0.0.1:8000/certificates/${idDataRef.current}/delete`,
			{
				method: "DELETE",
				headers: {
					Authorization: `bearer ${auth.token}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((response) => console.log(response))
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
