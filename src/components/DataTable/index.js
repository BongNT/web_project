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
import { randomId } from "@mui/x-data-grid-generator";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import "./index.css";

function EditToolbar(props) {
	const { setRows, setRowModesModel, setFilterButtonEl } = props;

	//Add
	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [
			{ id, name: "", email: "", type: "", isNew: true },
			...oldRows,
		]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	return (
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
				onClick={handleClick}
			>
				<AddIcon />
			</Fab>
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	setRowModesModel: PropTypes.func.isRequired,
	setRows: PropTypes.func.isRequired,
};

export default function DataTable(props) {
	const { data, columns } = props;

	const [filterButtonEl, setFilterButtonEl] = React.useState(null);

	const [rows, setRows] = React.useState(data);
	const [rowModesModel, setRowModesModel] = React.useState({});

	//Delete dialog
	const [delConfirm, setDelConfirm] = React.useState(false);
	const idDataRef = React.useRef();
	const handleDelete = () => {
		setDelConfirm(false);
		setRows(rows.filter((row) => row.id !== idDataRef.current));
		console.log(idDataRef.current);
	};
	const handleClose = () => {
		setDelConfirm(false);
	};

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};
	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	//Actions
	const handleEditClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};
	const handleSaveClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};
	const handleDeleteClick = (id) => () => {
		setDelConfirm(true);
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
						flex: 0.3,
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

			<Dialog open={delConfirm} onClose={handleClose}>
				<DialogTitle>{"Are you sure about that?"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Kiểm tra lại trước khi xóa, không thì mất cmn dữ liệu!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Từ từ</Button>
					<Button onClick={handleDelete}>Kệ, cứ xóa</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
