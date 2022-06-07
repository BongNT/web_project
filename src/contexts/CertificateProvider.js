import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const CertificateContext = React.createContext();

export function CertificateProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [facilities, setFacilities] = useData("facilities");

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const expiryDateRef = React.useRef();
	const statusRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		expiryDateRef.current = editRow.expiry_date;

		switch (editRow.status) {
			case "Còn hiệu lực":
				statusRef.current = 1;
				break;
			case "Hết hạn":
				statusRef.current = 2;
				break;
			default:
				statusRef.current = 3;
		}
	};

	const handleDeleteClick = (id) => () => {
		setOpenDeleteModal(true);
		idDataRef.current = id;
	};
	return (
		<CertificateContext.Provider
			value={{
				auth,
				fetchOk,
				facilities,
				setFacilities,
				setFetchOk,
				rows,
				setRows,
				openAddModal,
				openEditModal,
				openDeleteModal,
				setOpenAddModal,
				setOpenEditModal,
				setOpenDeleteModal,
				handleEditClick,
				handleDeleteClick,
				idDataRef,
				expiryDateRef,
				statusRef,
			}}
		>
			{children}
		</CertificateContext.Provider>
	);
}

export default CertificateContext;
