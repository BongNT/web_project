import React from "react";
import AuthContext from "./AuthProvider";

const InspectionContext = React.createContext();

export function InspectionProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const userNameRef = React.useRef();
	const emailRef = React.useRef();
	const typeRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		userNameRef.current = editRow.name;

		emailRef.current = editRow.email;

		typeRef.current = editRow.type === "Quản trị viên" ? 1 : 2;
	};

	const handleDeleteClick = (id) => () => {
		setOpenDeleteModal(true);
		idDataRef.current = id;
	};
	return (
		<InspectionContext.Provider
			value={{
				auth,
				fetchOk,
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
				userNameRef,
				emailRef,
				typeRef,
			}}
		>
			{children}
		</InspectionContext.Provider>
	);
}

export default InspectionContext;
