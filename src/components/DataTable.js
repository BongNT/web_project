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
import "../css/DataTable.css";
import { AddModal, DeleteDialog, EditModal } from "./Modal/UserModal";
import AuthContext from "../contexts/AuthProvider";

function EditToolbar(props) {
	const { setFilterButtonEl, setOpenAddModal } = props;

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
		</div>
	);
}

export default function DataTable(props) {
	const [filterButtonEl, setFilterButtonEl] = React.useState(null);
	const {
		rows,
		columns,
		setOpenAddModal,
		handleEditClick,
		handleDeleteClick,
	} = props;
	return (
		<Box
			sx={{
				width: "100%",
				height: "29.15rem",
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
						width: 120,
						getActions: ({ id }) => {
							return [
								<GridActionsCellItem
									icon={<EditIcon />}
									label="Edit"
									onClick={handleEditClick(id)}
									color="primary"
									className="me-3"
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
				components={{
					Toolbar: EditToolbar,
				}}
				componentsProps={{
					toolbar: { setFilterButtonEl, setOpenAddModal },
					panel: {
						anchorEl: filterButtonEl,
					},
				}}
				hideFooterSelectedRowCount
				pageSize={6}
			/>
		</Box>
	);
}
