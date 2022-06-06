import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const InspectionContext = React.createContext();

export function InspectionProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [facilities, setFacilities] = useData("facilities");

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const startDateRef = React.useRef();
	const endDateRef = React.useRef();
	const resultRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		startDateRef.current = editRow.start_date;

		endDateRef.current = editRow.end_date;

		resultRef.current =
			editRow.result === "Chưa kiểm tra"
				? 0
				: "Đang kiểm tra"
				? 1
				: "Đạt chuẩn"
				? 2
				: 3;
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
				startDateRef,
				endDateRef,
				resultRef,
				facilities,
				setFacilities,
			}}
		>
			{children}
		</InspectionContext.Provider>
	);
}

export default InspectionContext;
