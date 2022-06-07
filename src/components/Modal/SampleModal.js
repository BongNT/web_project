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
import SampleContext from "../../contexts/SampleProvider";

function AddModal() {
	const { auth, openAddModal, setRows, setOpenAddModal, inspections } =
		React.useContext(SampleContext);

	const [id, setId] = React.useState("");
	const handleChangeId = (event) => setId(event.target.value);

	const [inspection, setInspection] = React.useState(null);

	const [inspectionAgency, setInspectionAgency] = React.useState("");
	const handleChangeInspectionAgency = (event) =>
		setInspectionAgency(event.target.value);

	const [status, setStatus] = React.useState("");
	const handleChangeStatus = (event) => setStatus(event.target.value);

	const [resultDate, setResultDate] = React.useState("");
	const handleChangeResultDate = (event) => setResultDate(event.target.value);

	const [result, setResult] = React.useState("");
	const handleChangeResult = (event) => setResult(event.target.value);

	const handleAdd = async (event) => {
		event.preventDefault();

		await fetch("http://127.0.0.1:8000/samples/create", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				inspection_id: inspection.id,
				inspection_agency: inspectionAgency,
				status: status,
				result_date: resultDate,
				result: result,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response.detail))
			.then(() => {
				fetch("http://127.0.0.1:8000/samples/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.status === 1
								? (row.status = "Đang gửi đi")
								: row.status === 2
								? (row.status = "Đang xử lý")
								: (row.status = "Hoàn tất");
						});
						setRows(data);

						//reset dialog
						setId("");
						setInspection(null);
						setInspectionAgency("");
						setStatus("");
						setResultDate("");
						setResult("");
					});
			});

		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setId("");
		setInspection(null);
		setInspectionAgency("");
		setStatus("");
		setResultDate("");
		setResult("");
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm mẫu</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Số"
					variant="filled"
					value={id}
					onChange={handleChangeId}
				/>
				<Autocomplete
					className="mb-3"
					value={inspection}
					onChange={(event, newValue) => {
						setInspection(newValue);
					}}
					options={inspections}
					autoHighlight
					getOptionLabel={(option) => option.id.toString()}
					renderInput={(params) => (
						<TextField
							variant="filled"
							fullWidth
							{...params}
							label="Thuộc cuộc thanh tra số"
							inputProps={{
								...params.inputProps,
							}}
						/>
					)}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Đơn vị giám định"
					autoComplete="current-password"
					variant="filled"
					value={inspectionAgency}
					onChange={handleChangeInspectionAgency}
				/>
				<FormControl variant="filled" fullWidth className="mb-3">
					<InputLabel>Trạng thái</InputLabel>
					<Select value={status} onChange={handleChangeStatus}>
						<MenuItem value={1}>Đang gửi đi</MenuItem>
						<MenuItem value={2}>Đang kiểm tra</MenuItem>
						<MenuItem value={3}>Hoàn tất</MenuItem>
					</Select>
				</FormControl>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày nhận kết quả"
					variant="filled"
					type="date"
					value={resultDate}
					onChange={handleChangeResultDate}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					fullWidth
					label="Kết quả"
					variant="filled"
					value={result}
					onChange={handleChangeResult}
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
		inspectionAgencyRef,
		statusRef,
		resultDateRef,
		resultRef,
	} = React.useContext(SampleContext);

	const [editInfo, setEditInfo] = React.useState({ id: idDataRef.current });

	const [editInspectionAgency, setEditInspectionAgency] = React.useState(
		inspectionAgencyRef.current
	);
	const handleChangeInspectionAgency = (event) => {
		setEditInspectionAgency(event.target.value);
	};

	const [editStatus, setEditStatus] = React.useState(statusRef.current);
	const handleChangeStatus = (event) => {
		setEditStatus(event.target.value);
	};

	const [editResultDate, setEditResultDate] = React.useState(
		resultDateRef.current
	);
	const handleChangeResultDate = (event) => {
		setEditResultDate(event.target.value);
	};

	const [editResult, setEditResult] = React.useState(resultRef.current);
	const handleChangeResult = (event) => {
		setEditResult(event.target.value);
	};

	React.useEffect(() => {
		setEditInfo({ ...editInfo, inspection_agency: editInspectionAgency });
	}, [editInspectionAgency]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, status: editStatus });
	}, [editStatus]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, result_date: editResultDate });
	}, [editResultDate]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, result: editResult });
	}, [editResult]);

	const handleChange = async (event) => {
		event.preventDefault();
		console.log(editInfo);
		await fetch("http://127.0.0.1:8000/samples/update", {
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
				fetch("http://127.0.0.1:8000/samples/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							row.status === 1
								? (row.status = "Đang gửi đi")
								: row.status === 2
								? (row.status = "Đang xử lý")
								: (row.status = "Hoàn tất");
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
			<DialogTitle>Sửa mẫu số {idDataRef.current}</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Đơn vị giám định"
					autoComplete="current-password"
					variant="filled"
					value={editInspectionAgency}
					onChange={handleChangeInspectionAgency}
				/>
				<FormControl variant="filled" fullWidth className="mb-3">
					<InputLabel>Trạng thái</InputLabel>
					<Select value={editStatus} onChange={handleChangeStatus}>
						<MenuItem value={1}>Đang gửi đi</MenuItem>
						<MenuItem value={2}>Đang kiểm tra</MenuItem>
						<MenuItem value={3}>Hoàn tất</MenuItem>
					</Select>
				</FormControl>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày nhận kết quả"
					variant="filled"
					type="date"
					value={editResultDate}
					onChange={handleChangeResultDate}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					fullWidth
					label="Kết quả"
					variant="filled"
					value={editResult}
					onChange={handleChangeResult}
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
	} = React.useContext(SampleContext);

	const handleDelete = async () => {
		await fetch(
			`http://127.0.0.1:8000/samples/${idDataRef.current}/delete`,
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
