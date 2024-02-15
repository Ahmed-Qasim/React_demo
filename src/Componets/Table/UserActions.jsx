import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "./UserActions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../Services/API";
function UserActions(props) {
    const { row, fetchEmployeeFiles } = props;
    const id = row.id;
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        const result = await fetch(`/api/employees/${id}`, {
            method: "DELETE",
        });
        await fetchEmployeeFiles();
        setLoading(false);
        //deleteEmployee(id);
    };
    return (
        <Box>
            <Button>
                <Link
                    to={`/entry/${id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                >
                    Edit
                </Link>
            </Button>
            <LoadingButton onClick={onDelete} color="error" loading={loading}>
                Delete
            </LoadingButton>
        </Box>
    );
}

export default UserActions;
