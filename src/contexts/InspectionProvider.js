import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const InspectionContext = React.createContext();

export function InspectionProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [facilities, setFacilities] = useData("facilities");
	const [sgFacilities, setSgFacilities] = useData("sg_facilities");

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

		switch (editRow.result) {
			case "Đang kiểm tra":
				resultRef.current = 1;
				break;
			case "Đạt chuẩn":
				resultRef.current = 2;
				break;
			case "Không đạt chuẩn":
				resultRef.current = 3;
				break;
			default:
				resultRef.current = 0;
		}
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
				sgFacilities,
				setSgFacilities,
			}}
		>
			{children}
		</InspectionContext.Provider>
	);
}

export default InspectionContext;
