import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				height: 550,
			}}
		>
			<Box className="w-100 text-center">
				<Typography variant="h2">Chỉ dành cho Admin</Typography>
				<Typography>
					Bạn không có quyền truy cập chức năng này.
				</Typography>
			</Box>

			<Button onClick={goBack}>Trở lại</Button>
		</Box>
	);
}
