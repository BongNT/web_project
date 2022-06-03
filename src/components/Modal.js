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
} from "@mui/material";
import PropTypes from "prop-types";

AddModal.propTypes = {
	setOpen: PropTypes.func.isRequired,
	setRows: PropTypes.func.isRequired,
};

function AddModal(props) {
	const { open, setOpen, setRows } = props;

	const [userName, setUserName] = React.useState("");
	const handleChangeUserName = (event) => setUserName(event.target.value);

	const [password, setPassword] = React.useState("");
	const handleChangePassword = (event) => setPassword(event.target.value);

	const [email, setEmail] = React.useState("");
	const handleChangeEmail = (event) => setEmail(event.target.value);

	const [type, setType] = React.useState("");
	const handleChangeType = (event) => setType(event.target.value);

	const handleAdd = () => {
		fetch("http://127.0.0.1:8000/users/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: userName,
				password: password,
				email: email,
				type: type,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(response.detail))
			.then(() => {
				fetch("http://127.0.0.1:8000/users/")
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							if (row.type === 0) {
								row.type = "Siêu quản trị viên";
							} else if (row.type === 1) {
								row.type = "Quản trị viên";
							} else {
								row.type = "Quản lý";
							}
						});
						setRows(data);

						//reset dialog
						setUserName("");
						setPassword("");
						setEmail("");
						setType("");
					});
			});

		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Thêm người dùng</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Tên người dùng"
					variant="filled"
					value={userName}
					onChange={handleChangeUserName}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Mật khẩu"
					autoComplete="current-password"
					variant="filled"
					value={password}
					onChange={handleChangePassword}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Thư điện tử"
					type="email"
					variant="filled"
					value={email}
					onChange={handleChangeEmail}
				/>
				<FormControl variant="filled" fullWidth>
					<InputLabel>Chức vụ</InputLabel>
					<Select value={type} onChange={handleChangeType}>
						<MenuItem value={1}>Quản trị viên</MenuItem>
						<MenuItem value={2}>Quản lý</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Từ từ</Button>
				<Button onClick={handleAdd}>Thêm mới</Button>
			</DialogActions>
		</Dialog>
	);
}

function EditModal(props) {
	const { open, setOpen, rows, setRows, id, userName, email, type } = props;
	const [editInfo, setEditInfo] = React.useState({ id: id });

	const [editPassword, setEditPassword] = React.useState("");
	const handleChangePassword = (event) => {
		setEditPassword(event.target.value);
	};

	const [editEmail, setEditEmail] = React.useState(email);
	const handleChangeEmail = (event) => {
		setEditEmail(event.target.value);
	};

	const [editType, setEditType] = React.useState(type);
	const handleChangeType = (event) => {
		setEditType(event.target.value);
	};

	React.useEffect(() => {
		editPassword !== "" &&
			setEditInfo({ ...editInfo, password: editPassword });
	}, [editPassword]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, email: editEmail });
	}, [editEmail]);

	React.useEffect(() => {
		setEditInfo({ ...editInfo, type: editType });
	}, [editType]);

	const handleChange = () => {
		console.log(editInfo);
		fetch("http://127.0.0.1:8000/users/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editInfo),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
				fetch("http://127.0.0.1:8000/users/")
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							if (row.type === 0) {
								row.type = "Siêu quản trị viên";
							} else if (row.type === 1) {
								row.type = "Quản trị viên";
							} else {
								row.type = "Quản lý";
							}
						});
						setRows(data);
					});
			});
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Sửa người dùng {userName}</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Mật khẩu"
					autoComplete="current-password"
					variant="filled"
					value={editPassword}
					onChange={handleChangePassword}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Thư điện tử"
					type="email"
					variant="filled"
					value={editEmail}
					onChange={handleChangeEmail}
				/>
				<FormControl variant="filled" fullWidth>
					<InputLabel>Chức vụ</InputLabel>
					<Select value={editType} onChange={handleChangeType}>
						<MenuItem value={1}>Quản trị viên</MenuItem>
						<MenuItem value={2}>Quản lý</MenuItem>
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
				<Button onClick={handleChange}>Lưu thay đổi</Button>
			</DialogActions>
		</Dialog>
	);
}

function DeleteDialog(props) {
	const { open, handleDelete, setOpen } = props;

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Bạn chắc chắn muốn xóa?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Kiểm tra lại trước khi xóa!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Kiểm tra lại</Button>
				<Button onClick={handleDelete}>Xóa</Button>
			</DialogActions>
		</Dialog>
	);
}

export { AddModal, EditModal, DeleteDialog };
