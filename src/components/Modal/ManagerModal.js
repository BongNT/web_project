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
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AuthContext from "../../contexts/AuthProvider";
import UserContext from "../../contexts/UserProvider";

const USER_REGEX = /^[a-zA-Z0-9]+$/;
const PWD_REGEX = /^([A-Za-z0-9@#$%^&+=]{8,})$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function AddModal() {
	const { auth, openAddModal, setRows, setOpenAddModal } =
		React.useContext(UserContext);

	const [validUserName, setValidUserName] = React.useState(true);
	const [validPassword, setValidPassword] = React.useState(true);
	const [validEmail, setValidEmail] = React.useState(true);

	const [userName, setUserName] = React.useState("");
	const handleChangeUserName = (event) => setUserName(event.target.value);

	const [password, setPassword] = React.useState("");
	const handleChangePassword = (event) => setPassword(event.target.value);

	const [email, setEmail] = React.useState("");
	const handleChangeEmail = (event) => setEmail(event.target.value);

	const [type, setType] = React.useState("");
	const handleChangeType = (event) => setType(event.target.value);

	const handleAdd = async (event) => {
		event.preventDefault();
		const v1 = USER_REGEX.test(userName);
		setValidUserName(v1);
		const v2 = PWD_REGEX.test(password);
		setValidPassword(v2);
		const v3 = EMAIL_REGEX.test(email);
		setValidEmail(v3);
		if (!v1 || !v2 || !v3) {
			return;
		}
		await fetch("http://127.0.0.1:8000/users/create", {
			method: "POST",
			headers: {
				Authorization: `bearer ${auth.token}`,
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
				fetch("http://127.0.0.1:8000/users/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							if (row.type === 0) {
								row.type = "Quản trị viên cấp cao";
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

		setOpenAddModal(false);
	};

	const handleClose = () => {
		setOpenAddModal(false);
		setUserName("");
		setPassword("");
		setEmail("");
		setType("");
		setValidUserName(true);
		setValidPassword(true);
		setValidEmail(true);
	};

	return (
		<Dialog open={openAddModal} onClose={handleClose}>
			<DialogTitle>Thêm người dùng</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Tên người dùng"
					variant="filled"
					error={!validUserName}
					helperText={
						validUserName
							? undefined
							: "Tên người dùng không đúng định dạng"
					}
					value={userName}
					onChange={handleChangeUserName}
					onFocus={() => setValidUserName(true)}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Mật khẩu"
					error={!validPassword}
					helperText={
						validPassword
							? undefined
							: "Mật khẩu không đúng định dạng"
					}
					autoComplete="current-password"
					variant="filled"
					value={password}
					onChange={handleChangePassword}
					onFocus={() => setValidPassword(true)}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Thư điện tử"
					type="email"
					error={!validEmail}
					helperText={
						validEmail
							? undefined
							: "Thư điện tử không đúng định dạng"
					}
					variant="filled"
					value={email}
					onChange={handleChangeEmail}
					onFocus={() => setValidEmail(true)}
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
		userNameRef,
		emailRef,
		typeRef,
	} = React.useContext(UserContext);

	const [validEmail, setValidEmail] = React.useState(true);
	const [validPassword, setValidPassword] = React.useState(true);

	const [editInfo, setEditInfo] = React.useState({ id: idDataRef.current });

	const [editPassword, setEditPassword] = React.useState("");
	const handleChangePassword = (event) => {
		setEditPassword(event.target.value);
	};

	const [editEmail, setEditEmail] = React.useState(emailRef.current || "");
	const handleChangeEmail = (event) => {
		setEditEmail(event.target.value);
	};

	const [editType, setEditType] = React.useState(typeRef.current);
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

	const handleChange = async (event) => {
		event.preventDefault();
		const v1 = PWD_REGEX.test(editPassword);
		setValidPassword(v1);
		const v2 = EMAIL_REGEX.test(editEmail);
		setValidEmail(v2);
		if (!v1 || !v2) {
			return;
		}
		await fetch("http://127.0.0.1:8000/users/update", {
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
				fetch("http://127.0.0.1:8000/users/", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((data) => {
						data.forEach((row) => {
							if (row.type === 0) {
								row.type = "Quản trị viên cấp cao";
							} else if (row.type === 1) {
								row.type = "Quản trị viên";
							} else {
								row.type = "Quản lý";
							}
						});
						setRows(data);
					});
			});
		setOpenEditModal(false);
	};

	const handleClose = () => {
		setOpenEditModal(false);
		setValidPassword(true);
		setValidEmail(true);
	};

	return (
		<Dialog open={openEditModal} onClose={handleClose}>
			<DialogTitle>Sửa người dùng {userNameRef.current}</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					className="mb-3"
					label="Mật khẩu"
					error={!validPassword}
					helperText={
						validPassword
							? undefined
							: "Mật khẩu không đúng định dạng"
					}
					autoComplete="current-password"
					variant="filled"
					value={editPassword}
					onChange={handleChangePassword}
					onFocus={() => setValidPassword(true)}
				/>
				<TextField
					fullWidth
					className="mb-3"
					label="Thư điện tử"
					type="email"
					error={!validEmail}
					helperText={
						validEmail
							? undefined
							: "Thư điện tử không đúng định dạng"
					}
					variant="filled"
					value={editEmail}
					onChange={handleChangeEmail}
					onFocus={() => setValidEmail(true)}
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
				<Button onClick={handleClose}>
					<CancelIcon className="me-1" color="error" /> Hủy bỏ
				</Button>
				<Button onClick={handleChange}>
					<SaveIcon className="me-1" /> Lưu thay đổi
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
	} = React.useContext(UserContext);

	const handleDelete = async () => {
		await fetch(`http://127.0.0.1:8000/users/${idDataRef.current}/delete`, {
			method: "DELETE",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
		})
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
