import { Typography, Container } from "@mui/material";
import EntryForm from "../../Componets/EmployeeForm";
import { useParams } from "react-router-dom";

function EmployeeFormPage() {
    const { id } = useParams();
    return (
        <>
            <Container
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
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

                <EntryForm />
            </Container>
        </>
    );
}

export default EmployeeFormPage;
