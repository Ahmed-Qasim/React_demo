import {
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserActions from "./UserActions";
import { isEmpty } from "../../../utils";
import LinearProgress from "@mui/material/LinearProgress";

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
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployeeFiles = async (filterObject) => {
        const URL =
            "/api/employees" +
            (filterObject && !isEmpty(filterObject)
                ? "?" + new URLSearchParams(filterObject)
                : "");

        const response = await fetch(URL);
        const data = await response.json();
        setRows(data.employees);
        setLoading(false);
    };

    useEffect(() => {
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
            width: 220,
            editable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "salaryStatus",
            headerName: "Salary Status",
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
            renderCell: (params) => (
                <UserActions
                    row={params.row}
                    fetchEmployeeFiles={fetchEmployeeFiles}
                />
            ),
        },
    ];

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
                loadingOverlay: LinearProgress,
            }}
            loading={loading}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onFilterModelChange={onFiltersChange}
            filterMode="server"
        />
    );
};
export default EmployeeTable;
