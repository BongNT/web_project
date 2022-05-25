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
	useMediaQuery,
} from "@mui/material";
import React from "react";
import "./SignIn.css";

export default function SignIn() {
	//Show password
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

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

	return (
		<Container id="sign-in" className="vh-100">
			<Box className="row justify-content-center align-items-center h-100">
				<div className="col-md-9 col-lg-6 col-xl-6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
						className="img-fluid"
						alt="Sample image"
					/>
				</div>
				<div className="col-md-8 col-lg-4 col-xl-4">
					<form>
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-end",
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
							/>
						</Box>

						<Box
							sx={{
								display: "flex",
								alignItems: "flex-end",
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
							<FormControl fullWidth variant="filled">
								<InputLabel htmlFor="filled-adornment-password">
									Mật khẩu
								</InputLabel>
								<FilledInput
									id="filled-adornment-password"
									type={
										values.showPassword
											? "text"
											: "password"
									}
									value={values.password}
									onChange={handleChange("password")}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
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
									}
								/>
							</FormControl>
						</Box>

						<Container className="text-center">
							<p href="#!" className="mt-3">
								Trường hợp quên mật khẩu vui lòng liên hệ ... để
								được cấp lại!
							</p>
							<Button
								className={matches && "w-100"}
								href="/"
								variant="contained"
								size="large"
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
