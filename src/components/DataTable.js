import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridToolbarFilterButton,
	viVN,
	GridToolbarExport,
} from "@mui/x-data-grid";
import "./DataTable.css";
import { AddModal, DeleteDialog, EditModal } from "./Modal";
import AuthProvider from "../contexts/AuthProvider";

function EditToolbar(props) {
	const { setRows, setFilterButtonEl } = props;
	//Add
	const [openAddModal, setOpenAddModal] = React.useState(false);

	return (
		<div>
			<GridToolbarContainer className="justify-content-end">
				<GridToolbarExport className="ms-3 me-3" />
				<GridToolbarFilterButton
					className="ms-3 me-3"
					ref={setFilterButtonEl}
				/>
				<Fab
					className="ms-3 me-3"
					size="small"
					color="primary"
					aria-label="add"
					onClick={() => setOpenAddModal(true)}
				>
					<AddIcon />
				</Fab>
			</GridToolbarContainer>
			<AddModal
				open={openAddModal}
				setOpen={setOpenAddModal}
				setRows={setRows}
			/>
		</div>
	);
}

EditToolbar.propTypes = {
	setRows: PropTypes.func.isRequired,
};

export default function DataTable(props) {
	const { data, columns } = props;

	const [filterButtonEl, setFilterButtonEl] = React.useState(null);

	const [rows, setRows] = React.useState(data);
	const [rowModesModel, setRowModesModel] = React.useState({});

	const [openEditDialog, setOpenEditDialog] = React.useState(false);

	//Delete dialog
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
	const idDataRef = React.useRef();
	const userNameRef = React.useRef();

	const emailRef = React.useRef();
	const typeRef = React.useRef();

	const handleDelete = () => {
		fetch(`http://127.0.0.1:8000/users/${idDataRef.current}/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response.detail);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		setOpenDeleteDialog(false);
		setRows(rows.filter((row) => row.id !== idDataRef.current));
	};

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};
	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	//Actions
	const handleEditClick = (id) => () => {
		setOpenEditDialog(true);
		idDataRef.current = id;
		const editRow = rows.find((row) => row.id === id);
		userNameRef.current = editRow.name;

		emailRef.current = editRow.email;

		typeRef.current = editRow.type === "Quản trị viên" ? 1 : 2;
	};
	const handleSaveClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
		const saveRow = rows.find((row) => row.id === id);
		console.log(saveRow.id);
		console.log({
			id: saveRow.id,
			password: saveRow.password,
			email: saveRow.email,
			type:
				saveRow.type === "Siêu quản trị viên"
					? 0
					: saveRow.type === "Quản trị viên"
					? 1
					: 2,
		});
	};
	const handleDeleteClick = (id) => () => {
		setOpenDeleteDialog(true);
		idDataRef.current = id;
	};
	const handleCancelClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	//Update data
	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	return (
		<Box
			sx={{
				width: "100%",
			}}
		>
			<DataGrid
				className="m-3 mt-0"
				localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
				disableColumnMenu={true}
				rows={rows}
				columns={[
					...columns,
					{
						field: "actions",
						type: "actions",
						headerName: "Hành động",
						cellClassName: "actions",
						flex: 0.5,
						getActions: ({ id }) => {
							const isInEditMode =
								rowModesModel[id]?.mode === GridRowModes.Edit;

							if (isInEditMode) {
								return [
									<GridActionsCellItem
										icon={<SaveIcon />}
										label="Save"
										onClick={handleSaveClick(id)}
										color="primary"
									/>,
									<GridActionsCellItem
										icon={<CancelIcon />}
										label="Cancel"
										className="textPrimary"
										onClick={handleCancelClick(id)}
										color="error"
									/>,
								];
							}
							return [
								<GridActionsCellItem
									icon={<EditIcon />}
									label="Edit"
									onClick={handleEditClick(id)}
									color="primary"
								/>,
								<GridActionsCellItem
									icon={<DeleteIcon />}
									label="Delete"
									onClick={handleDeleteClick(id)}
									color="error"
								/>,
							];
						},
					},
				]}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				components={{
					Toolbar: EditToolbar,
				}}
				componentsProps={{
					toolbar: { setRows, setRowModesModel, setFilterButtonEl },
					panel: {
						anchorEl: filterButtonEl,
					},
				}}
				experimentalFeatures={{ newEditingApi: true }}
				hideFooterSelectedRowCount
				autoHeight={true}
				pageSize={6}
			/>

			{openDeleteDialog && (
				<DeleteDialog
					open={openDeleteDialog}
					setOpen={setOpenDeleteDialog}
					handleDelete={handleDelete}
				/>
			)}

			{openEditDialog && (
				<EditModal
					open={openEditDialog}
					setOpen={setOpenEditDialog}
					setRows={setRows}
					id={idDataRef.current}
					userName={userNameRef.current}
					email={emailRef.current}
					type={typeRef.current}
				/>
			)}
		</Box>
	);
}
