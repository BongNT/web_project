import React from "react";
import AuthContext from "./AuthProvider";

const UserContext = React.createContext();

export function UserProvider({ children }) {
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
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);

		if (editRow.type === "Quản trị viên cấp cao") {
			return;
		}
		userNameRef.current = editRow.name;

		emailRef.current = editRow.email;

		typeRef.current = editRow.type === "Quản trị viên" ? 1 : 2;
		setOpenEditModal(true);
	};

	const handleDeleteClick = (id) => () => {
		idDataRef.current = id;
		const deleteRow = rows.find((row) => row.id === id);
		if (deleteRow.type === "Quản trị viên cấp cao") {
			return;
		}
		setOpenDeleteModal(true);
	};
	return (
		<UserContext.Provider
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
		</UserContext.Provider>
	);
}

export default UserContext;
