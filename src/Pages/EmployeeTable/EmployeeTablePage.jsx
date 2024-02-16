import Typography from "@mui/material/Typography";
import EmployeeTable from "./Table/EmployeeTable";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

function EmployeeTablePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/employees");
    };
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Welcome Back !
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Here is A list of Employees
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingBottom: "10px",
                }}
            >
                <Button variant="contained" onClick={handleClick}>
                    Add
                </Button>
            </Box>

            <EmployeeTable />
        </Container>
    );
}

export default EmployeeTablePage;
