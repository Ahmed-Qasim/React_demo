import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
//import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import UserActions from "./UserActions";
import { getAllEmployees } from "../Services/API";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const EmployeeFilesTable = () => {
    const [rows, setRows] = useState(null);

    const fetchEmployeeFiles = () => {
        const employeeFiles = getAllEmployees();
        setRows(employeeFiles);
    };
    useEffect(() => {
        fetchEmployeeFiles();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "code",
            headerName: "Code",
            width: 150,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "name",
            headerName: "Name",
            width: 150,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "salaryStatus",
            headerName: "Salay Status",
            width: 150,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "hiringDate",
            headerName: "Hiring Date",
            type: "number",
            width: 150,
            headerAlign: "center",
            align: "center",
        },

        {
            field: "jobCode",
            headerName: "Job Code",
            type: "number",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 200,
            headerAlign: "center",
            align: "center",
            type: "actions",
            disableColumnMenu: true,
            renderCell: (params) => {
                //  console.log(params);
                return (
                    <UserActions
                        row={params.row}
                        fetchEmployeeFiles={fetchEmployeeFiles}
                    />
                );
            },
        },
    ];
    if (!rows) {
        return <>Loading...</>;
    }
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            slots={{
                toolbar: CustomToolbar,
            }}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
};
export default EmployeeFilesTable;
