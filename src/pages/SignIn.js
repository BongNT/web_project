import React from "react";
import "./SignIn.css";

export default function SignIn() {
	return (
		<section className="vh-100">
			<div className="container-fluid h-100">
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-md-9 col-lg-6 col-xl-5">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid"
							alt="Sample image"
						/>
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4">
						<form>
							{/* <div className="mb-4">
								<label
									className="col-form-label-lg"
									htmlFor="email"
								>
									Địa chỉ email
								</label>
								<input
									type="email"
									id="email"
									className="form-control form-control-lg"
									placeholder="Nhập địa chỉ email hợp lệ"
								/>
							</div>

							<div className="mb-3">
								<label
									className="col-form-label-lg"
									htmlFor="password"
								>
									Mật khẩu
								</label>
								<input
									type="password"
									id="password"
									className="form-control form-control-lg"
									placeholder="Nhập mật khẩu"
								/>
							</div> */}

							<div className="form-floating mb-3">
								<input
									type="email"
									className="form-control"
									id="email-input"
									placeholder="name@example.com"
								/>
								<label htmlFor="email-input">
									Địa chỉ email
								</label>
								<div className="form-notch">
									<div
										className="form-notch-leading"
										style={{ width: "9px" }}
									></div>
									<div
										className="form-notch-middle"
										style={{ width: "100px" }}
									></div>
									<div className="form-notch-trailing"></div>
								</div>
							</div>

							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="password-input"
									placeholder="Password"
								/>
								<label htmlFor="password-input">Mật khẩu</label>
								<div className="form-notch">
									<div
										className="form-notch-leading"
										style={{ width: "9px" }}
									></div>
									<div
										className="form-notch-middle"
										style={{ width: "75px" }}
									></div>
									<div className="form-notch-trailing"></div>
								</div>
							</div>

							<p href="#!" className="mt-3">
								Trường hợp quên mật khẩu vui lòng liên hệ ... để
								được cấp lại!
							</p>

							<div className="text-center text-lg-start mt-4">
								<button
									type="submit"
									className="btn btn-primary p-2"
								>
									Đăng nhập
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
