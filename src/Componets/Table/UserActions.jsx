import { Box,Button} from "@mui/material";
import "./UserActions";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../Services/API";
function UserActions(props) {
    const { row, fetchEmployeeFiles } = props;
    const id = row.id;

    const onDelete = () => {
        deleteEmployee(id);
        fetchEmployeeFiles();
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

            <Button onClick={onDelete} color="error">
                Delete
            </Button>
        </Box>
    );
}

export default UserActions;
