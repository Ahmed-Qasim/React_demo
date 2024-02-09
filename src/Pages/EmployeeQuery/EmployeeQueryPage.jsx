import Typography from "@mui/material/Typography";
import EmployeeFilesTable from "../../Componets/EmployeeFilesTable";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from  'react-router';


function EmployeeQueryPage() {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/entry');
    };
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 5,
                marginBottom: 5,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "30px",
                }}
            >
                <Typography variant="h5" gutterBottom>
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
                <Button variant="contained" onClick={handleClick} >Add </Button>
            </Box>

            <EmployeeFilesTable />
        </Container>
    );
}

export default EmployeeQueryPage;
