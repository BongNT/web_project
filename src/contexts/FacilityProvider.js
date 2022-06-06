import React from "react";
import useData from "../hooks/useData";
import AuthContext from "./AuthProvider";

const FacilityContext = React.createContext();

export function FacilityProvider({ children }) {
	const { auth } = React.useContext(AuthContext);
	const [fetchOk, setFetchOk] = React.useState(false);

	const [districts, setDistricts] = useData("districts");

	const [openAddModal, setOpenAddModal] = React.useState(false);

	const [rows, setRows] = React.useState(null);

	const [openEditModal, setOpenEditModal] = React.useState(false);

	const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

	const idDataRef = React.useRef();
	const nameRef = React.useRef();
	const typeRef = React.useRef();
	const districtRef = React.useRef();
	const phoneNumberRef = React.useRef();

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditModal(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		nameRef.current = editRow.name;

		districtRef.current = editRow.in_district;

		typeRef.current =
			editRow.type === "Sản xuất thực phẩm"
				? 1
				: "Kinh doanh thực phẩm"
				? 2
				: 3;

		phoneNumberRef.current = editRow.phone_number;
	};

	const handleDeleteClick = (id) => () => {
		setOpenDeleteModal(true);
		idDataRef.current = id;
	};
	return (
		<FacilityContext.Provider
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
				nameRef,
				districtRef,
				typeRef,
				phoneNumberRef,
				districts,
				setDistricts,
			}}
		>
			{children}
		</FacilityContext.Provider>
	);
}

export default FacilityContext;
