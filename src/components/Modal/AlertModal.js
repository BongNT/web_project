import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AlertContext } from "../../contexts/AlertProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertModal({ type, message }) {
	const { openAlert, handleCloseAlert } = React.useContext(AlertContext);

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={openAlert}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert
					onClose={handleCloseAlert}
					severity={type}
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
