import {
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserActions from "./UserActions";
import { getEmployees } from "../../Services/API";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}
//extract data from fliter modal
function mapItemsToFilterObject(items) {
    const filterObject = {};
    items.forEach((item) => {
        filterObject[item.field] = item.value;
    });
    return filterObject;
}

const EmployeeTable = () => {
    const [rows, setRows] = useState(null);

    const fetchEmployeeFiles = (filterObject) => {
        const employeeFiles = getEmployees(filterObject);
        console.log("employeeFiles :>> ", employeeFiles);
        setRows(employeeFiles);
    };

    useEffect(() => {
        console.log("hi");
        fetchEmployeeFiles();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90, filterable: false },
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
            renderCell: (params) => (
                <span>{dayjs(params.value).format("DD/MM/YYYY")}</span>
            ),
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
    const onFiltersChange = (filters) => {
        const filterObject = mapItemsToFilterObject(filters.items);
        fetchEmployeeFiles(filterObject);
    };

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
            onFilterModelChange={onFiltersChange}
            on
            filterMode="server"
        />
    );
};
export default EmployeeTable;
