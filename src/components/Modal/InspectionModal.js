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
	Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import InspectionContext from "../../contexts/InspectionProvider";
import { AlertContext } from "../../contexts/AlertProvider";

function AddModal() {
	const {
		auth,
		openAddModal,
		setRows,
		setOpenAddModal,
		facilities,
		sgFacilities,
	} = React.useContext(InspectionContext);

	const { setOpenAlert } = React.useContext(AlertContext);

	const [valueFacility, setValueFacility] = React.useState(null);

	const [startDate, setStartDate] = React.useState("");
	const handleChangeStartDate = (event) => setStartDate(event.target.value);

	const [endDate, setEndDate] = React.useState("");
	const handleChangeEndDate = (event) => setEndDate(event.target.value);

	//suggest
	const [checked, setChecked] = React.useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	const handleAdd = async (event) => {
		event.preventDefault();
		await fetch("http://127.0.0.1:8000/inspections/create", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				facility_id: valueFacility.id,
				start_date: startDate,
				end_date: endDate,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
				setOpenAlert(true);
				fetch("http://127.0.0.1:8000/inspections/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
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

						//reset dialog
						setStartDate("");
						setEndDate("");
						setValueFacility(null);
					});
			});

		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setStartDate("");
		setEndDate("");
		setValueFacility(null);
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm kế hoạch thanh tra</DialogTitle>
			<DialogContent>
				<Autocomplete
					className="mb-3"
					value={valueFacility}
					onChange={(event, newValue) => {
						setValueFacility(newValue);
					}}
					options={checked ? sgFacilities : facilities}
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
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày bắt đầu"
					variant="filled"
					type="date"
					value={startDate}
					onChange={handleChangeStartDate}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày kết thúc"
					variant="filled"
					type="date"
					value={endDate}
					onChange={handleChangeEndDate}
					InputLabelProps={{ shrink: true }}
				/>
				<Switch checked={checked} onChange={handleChange} /> Gợi ý cơ sở
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
		startDateRef,
		endDateRef,
		resultRef,
	} = React.useContext(InspectionContext);

	const { setOpenAlert } = React.useContext(AlertContext);

	const [editInfo, setEditInfo] = React.useState({ id: idDataRef.current });

	const [editStartDate, setEditStartDate] = React.useState(
		startDateRef.current
	);
	const handleChangeStartDate = (event) => {
		setEditStartDate(event.target.value);
	};

	const [editResult, setEditResult] = React.useState(resultRef.current);
	const handleChangeResult = (event) => {
		setEditResult(event.target.value);
	};

	const [editEndDate, setEditEndDate] = React.useState(endDateRef.current);
	const handleChangeEndDate = (event) => {
		setEditEndDate(event.target.value);
	};

	React.useEffect(() => {
		setEditInfo({ ...editInfo, start_date: editStartDate });
	}, [editStartDate]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, end_date: editEndDate });
	}, [editEndDate]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, result: editResult });
	}, [editResult]);

	const handleChange = (event) => {
		event.preventDefault();
		fetch("http://127.0.0.1:8000/inspections/update", {
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
				setOpenAlert(true);
				fetch("http://127.0.0.1:8000/inspections/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
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
				Sửa thông tin cuộc thanh tra số {idDataRef.current}
			</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày bắt đầu"
					type="date"
					variant="filled"
					value={editStartDate}
					onChange={handleChangeStartDate}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Ngày kết thúc"
					type="date"
					variant="filled"
					value={editEndDate}
					onChange={handleChangeEndDate}
					InputLabelProps={{ shrink: true }}
				/>
				<FormControl variant="filled" fullWidth>
					<InputLabel>Kết quả</InputLabel>
					<Select value={editResult} onChange={handleChangeResult}>
						<MenuItem value={0}>Chưa kiểm tra</MenuItem>
						<MenuItem value={1}>Đang kiểm tra</MenuItem>
						<MenuItem value={2}>Đạt chuẩn</MenuItem>
						<MenuItem value={3}>Không đạt chuẩn</MenuItem>
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
	} = React.useContext(InspectionContext);

	const { setOpenAlert } = React.useContext(AlertContext);

	const handleDelete = () => {
		fetch(`http://127.0.0.1:8000/inspections/${idDataRef.current}/delete`, {
			method: "DELETE",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
			})
			.then(() => setOpenAlert(true));
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