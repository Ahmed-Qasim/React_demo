import { Typography, Container, Stack, TextField } from "@mui/material";
import EntryForm from "../../Componets/EntryForm/EntryForm";
function EmployeeEntryPage() {
    return (
        <>
            <Container sx={{ marginTop: 5, marginBottom: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Emoplyee Entry
                </Typography>
                <EntryForm />
            </Container>
        </>
    );
}

export default EmployeeEntryPage;
