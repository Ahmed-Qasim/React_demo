import { Typography, Container, Paper } from "@mui/material";
import EntryForm from "../../Componets/EmployeeForm";
import { useParams } from "react-router-dom";

function EmployeeFormPage() {
    const { id } = useParams();
    return (
        <>
            <Container
                sx={{
                    marginBottom: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {id ? (
                    <Typography variant="h4" margin={5} gutterBottom>
                        Update Employee
                    </Typography>
                ) : (
                    <Typography variant="h4" margin={3} gutterBottom>
                        Add Employee
                    </Typography>
                )}
                <Paper>
                    <EntryForm />
                </Paper>
            </Container>
        </>
    );
}

export default EmployeeFormPage;
