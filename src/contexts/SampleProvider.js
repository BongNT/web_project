import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const SampleContext = React.createContext();

export function SampleProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [inspections, setInspections] = useData("inspections");

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const inspectionAgencyRef = React.useRef();
	const statusRef = React.useRef();
	const resultDateRef = React.useRef();
	const resultRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);

		inspectionAgencyRef.current = editRow.inspection_agency;
		statusRef.current =
			editRow.status === "Đang gửi đi" ? 1 : "Đang kiểm tra" ? 2 : 3;
		resultDateRef.current = editRow.result_date;
		resultRef.current = editRow.result;
	};

	const handleDeleteClick = (id) => () => {
		setOpenDeleteModal(true);
		idDataRef.current = id;
	};
	return (
		<SampleContext.Provider
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
				inspectionAgencyRef,
				statusRef,
				resultDateRef,
				resultRef,
				inspections,
				setInspections,
			}}
		>
			{children}
		</SampleContext.Provider>
	);
}

export default SampleContext;
