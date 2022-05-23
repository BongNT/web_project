// // import React, { useCallback, useState } from "react";
// // import PropTypes from "prop-types";
// // import Toolbar from "../components/Toolbar";
// // import {
// // 	DataGrid,
// // 	GridToolbarContainer,
// // 	GridToolbarColumnsButton,
// // 	GridToolbarFilterButton,
// // 	GridToolbarExport,
// // 	GridToolbarDensitySelector,
// // } from "@mui/x-data-grid";
// // import Box from "@mui/material/Box";
// // import IconButton from "@mui/material/IconButton";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";

// // export default function Home() {
// // 	const [hoveredRow, setHoveredRow] = useState(null);

// // 	const onMouseEnterRow = (event) => {
// // 		const id = Number(event.currentTarget.getAttribute("data-id"));
// // 		setHoveredRow(id);
// // 	};

// // 	const onMouseLeaveRow = (event) => {
// // 		setHoveredRow(null);
// // 	};

// // 	const CustomToolbar = useCallback(() => {
// // 		return (
// // 			<GridToolbarContainer className="justify-content-end">
// // 				<GridToolbarFilterButton ref={setFilterButtonEl} />
// // 				<GridToolbarExport />
// // 			</GridToolbarContainer>
// // 		);
// // 	}, []);

// // 	const [filterButtonEl, setFilterButtonEl] = useState(null);

// // 	const columns = [
// // 		{
// // 			field: "id",
// // 			headerName: "ID",
// // 			width: 70,
// // 			editable: true,
// // 		},
// // 		{
// // 			field: "name_user",
// // 			headerName: "Name",
// // 			width: 130,
// // 			editable: true,
// // 		},
// // 		{ field: "email", headerName: "Email", width: 130, editable: true },
// // 		{
// // 			field: "type",
// // 			headerName: "Chức vụ",
// // 			width: 130,
// // 			editable: true,
// // 		},
// // 		{
// // 			field: "actions",
// // 			headerName: "Hành động",
// // 			width: 120,
// // 			sortable: false,
// // 			renderCell: (params) => {
// // 				return (
// // 					<Box
// // 						sx={{
// // 							width: "100%",
// // 							height: "100%",
// // 							display: "flex",
// // 							justifyContent: "center",
// // 							alignItems: "center",
// // 						}}
// // 					>
// // 						<IconButton>
// // 							<EditIcon sx={{ color: "blue" }} />
// // 						</IconButton>
// // 						<IconButton>
// // 							<DeleteIcon sx={{ color: "red" }} />
// // 						</IconButton>
// // 					</Box>
// // 				);
// // 			},
// // 		},
// // 		// {
// // 		// 	field: "fullName",
// // 		// 	headerName: "Full name",
// // 		// 	description: "This column has a value getter and is not sortable.",
// // 		// 	sortable: false,
// // 		// 	width: 160,
// // 		// 	valueGetter: (params) =>
// // 		// 		`${params.row.firstName || ""} ${params.row.lastName || ""}`,
// // 		// },
// // 	];

// // 	const rows = [
// // 		{
// // 			id: 1,
// // 			name_user: "string",
// // 			email: "string",
// // 			type: "default-admin",
// // 		},
// // 		{
// // 			id: 2,
// // 			name_user: "admin",
// // 			email: "string",
// // 			type: "default-admin",
// // 		},
// // 		{
// // 			id: 3,
// // 			name_user: "121",
// // 			email: "string",
// // 			type: "manager",
// // 		},
// // 		{
// // 			id: 4,
// // 			name_user: "b4",
// // 			email: "string",
// // 			type: "manager",
// // 		},
// // 		{
// // 			id: 5,
// // 			name_user: "b5",
// // 			email: "string",
// // 			type: "manager",
// // 		},
// // 		{
// // 			id: 6,
// // 			name_user: "t",
// // 			email: "string@abc.xyz",
// // 			type: "manager",
// // 		},
// // 	];

// // 	//controlled filter
// // 	const [filterModel, setFilterModel] = useState({
// // 		items: [
// // 			{
// // 				columnField: "",
// // 				operatorValue: "",
// // 				value: "",
// // 			},
// // 		],
// // 	});

// // 	return (
// // 		<div>
// // 			<Toolbar />{" "}
// // 			<div id="content" style={{ height: 500, width: "100%" }}>
// // 				<DataGrid
// // 					editMode="row"
// // 					rows={rows}
// // 					columns={columns}
// // 					disableColumnMenu={true}
// // 					pageSize={9}
// // 					rowsPerPageOptions={[5]}
// // 					checkboxSelection
// // 					//controlled filter
// // 					filterModel={filterModel}
// // 					onFilterModelChange={(newFilterModel) =>
// // 						setFilterModel(newFilterModel)
// // 					}
// // 					components={{
// // 						Toolbar: CustomToolbar,
// // 					}}
// // 					componentsProps={{
// // 						row: {
// // 							onMouseEnter: onMouseEnterRow,
// // 							onMouseLeave: onMouseLeaveRow,
// // 						},

// // 						//custom filter panel position
// // 						panel: {
// // 							anchorEl: filterButtonEl,
// // 						},
// // 					}}
// // 					// style
// // 					sx={{ m: 2 }}
// // 					// sx={{
// // 					// 	"& .MuiDataGrid-iconSeparator": {
// // 					// 		display: "none",
// // 					// 	},
// // 					// 	"& .MuiDataGrid-pinnedColumnHeaders": {
// // 					// 		boxShadow: "none",
// // 					// 		backgroundColor: "transparent",
// // 					// 	},
// // 					// 	"& .MuiDataGrid-pinnedColumns": {
// // 					// 		boxShadow: "none",
// // 					// 		// backgroundColor: "transparent",
// // 					// 		"& .MuiDataGrid-cell": {
// // 					// 			padding: 0,
// // 					// 		},
// // 					// 	},
// // 					// 	"& .MuiDataGrid-row": {
// // 					// 		cursor: "pointer",
// // 					// 		"&:hover": {
// // 					// 			backgroundColor: "whitesmoke",
// // 					// 		},
// // 					// 		"&:first-child": {
// // 					// 			borderTop: "1px solid rgba(224, 224, 224, 1)",
// // 					// 		},
// // 					// 	},
// // 					// 	// "& .MuiDataGrid-cell:focus": {
// // 					// 	// 	outline: "none",
// // 					// 	// },
// // 					// 	// "& .MuiDataGrid-cell:focus-within": {
// // 					// 	// 	outline: "none",
// // 					// 	// },
// // 					// }}
// // 				/>
// // 			</div>
// // 		</div>
// // 	);
// // }

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
} from "@mui/x-data-grid";
import {
	randomCreatedDate,
	randomTraderName,
	randomUpdatedDate,
	randomId,
} from "@mui/x-data-grid-generator";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const initialRows = [
	{
		id: 1,
		name: "string",
		email: "string",
		type: "default-admin",
	},
	{
		id: 2,
		name: "admin",
		email: "string",
		type: "default-admin",
	},
	{
		id: 3,
		name: "121",
		email: "string",
		type: "manager",
	},
	{
		id: 4,
		name: "b4",
		email: "string",
		type: "manager",
	},
	{
		id: 5,
		name: "b5",
		email: "string",
		type: "manager",
	},
	{
		id: 6,
		name: "t",
		email: "string@abc.xyz",
		type: "manager",
	},
];

function EditToolbar(props) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [
			...oldRows,
			{ id, name: "", email: "", type: "", isNew: true },
		]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button
				color="primary"
				startIcon={<AddIcon />}
				onClick={handleClick}
			>
				Thêm mới
			</Button>
			<GridToolbarFilterButton />
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	setRowModesModel: PropTypes.func.isRequired,
	setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid() {
	const [rows, setRows] = React.useState(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState({});

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

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
		setRows(rows.filter((row) => row.id !== id));
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

	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		console.log(rows);
		return updatedRow;
	};

	const columns = [
		{ field: "name", headerName: "Tên", width: 180, editable: true },
		{
			field: "email",
			headerName: "Thư điện tử",
			width: 200,
			editable: true,
		},
		{ field: "type", headerName: "Chức vụ", width: 180, editable: true },
		{
			field: "actions",
			type: "actions",
			headerName: "Hành động",
			width: 100,
			cellClassName: "actions",
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
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box
			sx={{
				height: 500,
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .textPrimary": {
					color: "text.primary",
				},
			}}
		>
			<DataGrid
				localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
				disableColumnMenu={true}
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				components={{
					Toolbar: EditToolbar,
				}}
				componentsProps={{
					toolbar: { setRows, setRowModesModel },
				}}
				experimentalFeatures={{ newEditingApi: true }}
				checkboxSelection={true}
			/>
		</Box>
	);
}
