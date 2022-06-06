import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const ManagerContext = React.createContext();

export function ManagerProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [managers, setManagers] = useData("managers");

	const [districts, setDistricts] = useData("districts");

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const userNameRef = React.useRef();
	const districtRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		userNameRef.current = editRow.name;

		districtRef.current = editRow.districts;
	};

	const handleDeleteClick = (id) => () => {
		setOpenDeleteModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);

		userNameRef.current = editRow.name;

		districtRef.current = editRow.districts;
	};
	return (
		<ManagerContext.Provider
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
				districtRef,
				managers,
				setManagers,
				districts,
				setDistricts,
			}}
		>
			{children}
		</ManagerContext.Provider>
	);
}

export default ManagerContext;
