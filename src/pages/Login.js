import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	AccountCircle,
	KeyOutlined,
	Visibility,
	VisibilityOff,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import "../css/Login.css";
import AuthContext from "../contexts/AuthProvider";

const USER_REGEX = /^[a-zA-Z0-9]+$/;
const PWD_REGEX = /^([A-Za-z0-9@#$%^&+=]{8,})$/;
export default function Login() {
	const { setAuth } = React.useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || "/";

	const [userName, setUserName] = React.useState("");
	const [validUserName, setValidUserName] = React.useState(true);
	const [validPassword, setValidPassword] = React.useState(true);
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});
	const [success, setSuccess] = React.useState(true);

	React.useEffect(() => {
		setValidUserName(true);
	}, [userName]);

	React.useEffect(() => {
		setValidPassword(true);
	}, [values.password]);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	//Responsive login button
	const matches = useMediaQuery("(max-width:992px)");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const v1 = USER_REGEX.test(userName);
		setValidUserName(v1);
		const v2 = PWD_REGEX.test(values.password);
		setValidPassword(v2);
		if (!v1 || !v2) {
			return;
		}
		let data = new FormData();
		data.append("username", userName);
		data.append("password", values.password);
		try {
			const response = await fetch("http://127.0.0.1:8000/login", {
				method: "POST",
				body: data,
			});
			if (response.status === 401) {
				setSuccess(false);
				return;
			}
			const res = await response.json();

			setAuth({
				user: userName,
				token: res.access_token,
				role: res.user_type,
			});
			//clear input
			setUserName("");
			setValues({ ...values, password: "" });

			navigate(from, { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container id="sign-in" className="vh-100">
			<Box className="row justify-content-center align-items-center h-100">
				<div className="col-md-9 col-lg-6 col-xl-6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
						className="img-fluid"
						alt="Sample"
					/>
				</div>
				<div className="col-md-8 col-lg-4 col-xl-4">
					<form onSubmit={handleSubmit}>
						<Box
							sx={{
								display: "flex",
								alignItems: "baseline",
								marginBottom: "2rem",
							}}
						>
							<AccountCircle
								sx={{
									color: "action.active",
									mr: 1,
									my: 0.5,
								}}
							/>

							<TextField
								fullWidth
								label="Tên người dùng"
								variant="filled"
								value={userName}
								error={!validUserName}
								helperText={
									validUserName
										? undefined
										: "Tên người dùng không đúng định dạng"
								}
								onChange={(event) =>
									setUserName(event.target.value)
								}
								onFocus={() => setSuccess(true)}
							/>
						</Box>

						<Box
							sx={{
								display: "flex",
								alignItems: "baseline",
								marginBottom: "2rem",
							}}
						>
							<KeyOutlined
								sx={{
									color: "action.active",
									mr: 1,
									my: 0.5,
								}}
							/>

							<TextField
								label="Mật khẩu"
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								fullWidth
								variant="filled"
								error={!validPassword}
								helperText={
									validPassword
										? undefined
										: "Mật khẩu không đúng định dạng"
								}
								onChange={handleChange("password")}
								onFocus={() => setSuccess(true)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
												edge="end"
											>
												{values.showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
						{!success && (
							<Typography
								variant="body2"
								className="text-center text-danger"
							>
								Tên người dùng hoặc mật khẩu không chính xác
							</Typography>
						)}
						<Container className="text-center">
							<Typography variant="body2" className="mt-3 mb-3">
								Trường hợp quên mật khẩu vui lòng liên hệ ... để
								được cấp lại!
							</Typography>
							<Button
								className={matches ? "w-100" : undefined}
								variant="contained"
								size="large"
								type="submit"
							>
								Đăng nhập
							</Button>
						</Container>
					</form>
				</div>
			</Box>
		</Container>
	);
}
