import React from "react";

const AlertContext = React.createContext();

export default function AlertProvider({ children }) {
	const [openAlert, setOpenAlert] = React.useState(false);

	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenAlert(false);
	};
	return (
		<AlertContext.Provider
			value={{ openAlert, setOpenAlert, handleCloseAlert }}
		>
			{children}
		</AlertContext.Provider>
	);
}

export { AlertContext };
