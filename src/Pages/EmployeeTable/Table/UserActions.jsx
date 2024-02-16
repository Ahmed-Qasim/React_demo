import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserActions(props) {
    const { row, fetchEmployeeFiles } = props;

    const [loading, setLoading] = useState(false);
    const id = row.id;

    const onDelete = async () => {
        setLoading(true);
        await fetch(`/api/employees/${id}`, {
            method: "DELETE",
        });
        await fetchEmployeeFiles();
        setLoading(false);
    };
    return (
        <Box>
            <Button>
                <Link
                    to={`/employees/${id}`}
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
