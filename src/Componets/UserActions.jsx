import Button from "@mui/material/Button";
import "./UserActions";
import { Link } from "react-router-dom";
import { deleteEmployee, getAllEmployees } from "../Services/API";
function UserActions(props) {
    const { row, fetchEmployeeFiles } = props;
    const id = row.id;

    const onDelete = () => {
        deleteEmployee(id);
        fetchEmployeeFiles();
    };
    return (
        <div className="container">
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
        </div>
    );
}

export default UserActions;
