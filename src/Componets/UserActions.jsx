import Button from "@mui/material/Button";
import "./UserActions";
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
            <Button onClick={() => alert(id)}>Edit</Button>

            <Button onClick={onDelete} color="error">
                Delete
            </Button>
        </div>
    );
}

export default UserActions;
