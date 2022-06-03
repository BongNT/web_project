import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<Box>
			<Typography variant="h2">Chỉ dành cho Admin</Typography>
			<p>Bạn không có quyền truy cập chức năng này.</p>
			<div className="flexGrow">
				<button onClick={goBack}>Trở lại</button>
			</div>
		</Box>
	);
}
