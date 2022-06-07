import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	IconButton,
	Input,
	InputAdornment,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import AuthContext from "../contexts/AuthProvider";
import "../css/MyAccount.css";

const PWD_REGEX = /^([A-Za-z0-9@#$%^&+=]{8,})$/;

export default function MyAccount() {
	const { auth } = React.useContext(AuthContext);

	const [fetchOk, setFetchOk] = React.useState(false);

	const infoRef = React.useRef();

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/me/info", {
			headers: { Authorization: `bearer ${auth.token}` },
		})
			.then((response) => response.json())
			.then((response) => {
				infoRef.current = response;
				setInfo({});
				setName(infoRef.current.fullname);
				setDob(infoRef.current.DOB);
				setGender(infoRef.current.gender);
				setPhone(infoRef.current.phone_number);
				setAddress(infoRef.current.address);
				setFetchOk(true);
			});
	}, []);

	//Change info
	const [info, setInfo] = React.useState({});

	const [name, setName] = React.useState("");
	const [dob, setDob] = React.useState("");
	const [gender, setGender] = React.useState(null);
	const [phone, setPhone] = React.useState("");
	const [address, setAddress] = React.useState(null);

	React.useEffect(() => {
		name !== infoRef.current?.fullname &&
			setInfo({ ...info, fullname: name });
	}, [name]);

	React.useEffect(() => {
		dob !== infoRef.current?.DOB && setInfo({ ...info, DOB: dob });
	}, [dob]);

	React.useEffect(() => {
		gender !== infoRef.current?.gender &&
			setInfo({ ...info, gender: gender });
	}, [gender]);

	React.useEffect(() => {
		phone !== infoRef.current?.phone &&
			setInfo({ ...info, phone_number: phone });
	}, [phone]);

	React.useEffect(() => {
		address !== infoRef.current?.address &&
			setInfo({ ...info, address: address });
	}, [address]);

	function handleChangeInfo(event) {
		event.preventDefault();

		fetch("http://127.0.0.1:8000/me/info/update", {
			method: "PUT",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		})
			.then((response) => response.json())
			.then((response) => console.log(response))
			.then(() => {
				fetch("http://127.0.0.1:8000/me/info", {
					headers: { Authorization: `bearer ${auth.token}` },
				})
					.then((response) => response.json())
					.then((response) => {
						infoRef.current = response;
						setInfo({});
						setName(infoRef.current.fullname);
						setDob(infoRef.current.DOB);
						setGender(infoRef.current.gender);
						setPhone(infoRef.current.phone_number);
						setAddress(infoRef.current.address);
						setFetchOk(true);
					});
			});
	}

	//Change password
	const [success, setSuccess] = React.useState(true);

	const [validOldPassword, setValidOldPassword] = React.useState(true);
	const [validPassword, setValidPassword] = React.useState(true);
	const [validPassword2, setValidPassword2] = React.useState(true);

	const [valueOldPassword, setValueOldPassword] = React.useState({
		password: "",
		showPassword: false,
	});

	const [valuePassword, setValuePassword] = React.useState({
		password: "",
		showPassword: false,
	});

	const [valuePassword2, setValuePassword2] = React.useState({
		password: "",
		showPassword: false,
	});

	React.useEffect(() => {
		setValidPassword(true);
	}, [valuePassword.password]);

	React.useEffect(() => {
		setValidPassword2(true);
	}, [valuePassword2.password]);

	const handleChangeOldPassword = (prop) => (event) => {
		setValueOldPassword({
			...valueOldPassword,
			[prop]: event.target.value,
		});
	};

	const handleClickShowOldPassword = () => {
		setValueOldPassword({
			...valueOldPassword,
			showPassword: !valueOldPassword.showPassword,
		});
	};

	const handleChangePassword = (prop) => (event) => {
		setValuePassword({ ...valuePassword, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValuePassword({
			...valuePassword,
			showPassword: !valuePassword.showPassword,
		});
	};

	const handleChangePassword2 = (prop) => (event) => {
		setValuePassword2({ ...valuePassword2, [prop]: event.target.value });
	};

	const handleClickShowPassword2 = () => {
		setValuePassword2({
			...valuePassword2,
			showPassword: !valuePassword2.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	function handleOpenConfirm(event) {
		event.preventDefault();
		const v1 = PWD_REGEX.test(valueOldPassword.password);
		setValidOldPassword(v1);
		const v2 = PWD_REGEX.test(valuePassword.password);
		setValidPassword(v2);
		const v3 = valuePassword2.password === valuePassword.password;
		setValidPassword2(v3);
		if (!v1 || !v2 || !v3) {
			return;
		}
		fetch("http://127.0.0.1:8000/me/password/update", {
			method: "PUT",
			headers: {
				Authorization: `bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				old_password: valueOldPassword.password,
				new_password: valuePassword2.password,
			}),
		})
			.then((response) => {
				if (response.status === 401) {
					setSuccess(false);
					return;
				} else {
					response.json();
					setValueOldPassword({
						password: "",
						showPassword: false,
					});
					setValuePassword({
						password: "",
						showPassword: false,
					});
					setValuePassword2({
						password: "",
						showPassword: false,
					});
				}
			})
			.then((response) => {
				console.log(response);
			});
	}

	return fetchOk ? (
		<Box
			id="my-account"
			sx={{
				display: "flex",
				flexWrap: "wrap",
				minHeight: "550px",
				flexDirection: "row",
			}}
		>
			<Box sx={{ flexGrow: 1 }} className="m-3">
				<Box sx={{ display: "flex" }}>
					<Typography className="m-3" htmlFor="my-name">
						Họ và tên:
					</Typography>
					<Input
						value={name}
						id="my-name"
						className="m-3"
						onChange={(event) => setName(event.target.value)}
					/>
				</Box>

				<Box sx={{ display: "flex" }}>
					<Typography className="m-3" htmlFor="my-dob">
						Ngày sinh:
					</Typography>
					<Input
						value={dob}
						type="date"
						id="my-dob"
						className="m-3"
						onChange={(event) => setDob(event.target.value)}
					/>
				</Box>

				<FormControl sx={{ display: "flex", flexDirection: "row" }}>
					<Typography className="m-3 mt-4" htmlFor="my-dob">
						Giới tính
					</Typography>
					<RadioGroup
						sx={{ display: "flex", flexDirection: "row" }}
						className="m-3"
						name="controlled-radio-buttons-group"
						value={gender}
						onChange={(event) => setGender(event.target.value)}
					>
						<FormControlLabel
							value={1}
							control={<Radio />}
							label="Name"
						/>
						<FormControlLabel
							value={2}
							control={<Radio />}
							label="Nữ"
						/>
						<FormControlLabel
							value={3}
							control={<Radio />}
							label="Khác"
						/>
					</RadioGroup>
				</FormControl>

				<Box sx={{ display: "flex" }}>
					<Typography className="m-3" htmlFor="my-phone">
						Số điện thoại:
					</Typography>
					<Input
						value={phone}
						id="my-phone"
						className="m-3"
						onChange={(event) => setPhone(event.target.value)}
					/>
				</Box>

				<Box sx={{ display: "flex" }} className="mb-4">
					<Typography className="m-3" htmlFor="my-address">
						Địa chỉ:
					</Typography>
					<Input
						value={address}
						id="my-address"
						className="m-3"
						onChange={(event) => setAddress(event.target.value)}
					/>
				</Box>

				<Box
					className="mb-4"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						variant="outlined"
						size="large"
						type="submit"
						onClick={handleChangeInfo}
					>
						Sửa
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				className="m-5"
			>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography className="mb-4">
						Mật khẩu có độ dài từ 8 kí tự trở lên,
						<br />
						có thể bao gồm chữ thường, chữ hoa,
						<br />
						chữ số và một số ký tự đặc biệt như @, #, $, %, ^, &, +,
						=.
					</Typography>

					<TextField
						className="mb-4"
						label="Mật khẩu cũ"
						type={
							valueOldPassword.showPassword ? "text" : "password"
						}
						value={valueOldPassword.password}
						variant="filled"
						error={!validOldPassword}
						helperText={
							validOldPassword
								? undefined
								: "Mật khẩu không đúng định dạng"
						}
						onChange={handleChangeOldPassword("password")}
						onFocus={() => setSuccess(true)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowOldPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{valueOldPassword.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						className="mb-4"
						label="Mật khẩu mới"
						type={valuePassword.showPassword ? "text" : "password"}
						value={valuePassword.password}
						variant="filled"
						error={!validPassword}
						helperText={
							validPassword
								? undefined
								: "Mật khẩu không đúng định dạng"
						}
						onChange={handleChangePassword("password")}
						onFocus={() => setSuccess(true)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{valuePassword.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<TextField
						className="mb-4"
						label="Nhập lại mật khẩu mới"
						type={valuePassword2.showPassword ? "text" : "password"}
						value={valuePassword2.password}
						variant="filled"
						error={!validPassword2}
						helperText={
							validPassword2
								? undefined
								: "Mật khẩu không trùng khớp"
						}
						onChange={handleChangePassword2("password")}
						onFocus={() => setSuccess(true)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword2}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{valuePassword2.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{!success && (
						<Typography
							variant="body2"
							className="text-center text-danger mb-4"
						>
							Mật khẩu không chính xác
						</Typography>
					)}
				</Box>
				<Box
					className="mb-3"
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						size="large"
						onClick={handleOpenConfirm}
					>
						Đổi mật khẩu
					</Button>
				</Box>
			</Box>
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
