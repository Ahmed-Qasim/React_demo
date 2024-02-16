import { Typography, Container, Paper, Box } from "@mui/material";
import EntryForm from "./Form";
import { useParams } from "react-router-dom";

function EmployeeFormPage() {
    const { id } = useParams();
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Paper sx={{ minWidth: "40%", padding: 5 }}>
                    <Box sx={{ marginBottom: 5 }}>
                        <Typography variant="h5" fontWeight="600">
                            {id ? "Update Employee" : " Add Employee"}
                        </Typography>
                        <Typography variant="subtitle1">
                            please fill in the employee details
                        </Typography>
                    </Box>

                    <EntryForm />
                </Paper>
            </Container>
        </>
    );
}

export default EmployeeFormPage;
