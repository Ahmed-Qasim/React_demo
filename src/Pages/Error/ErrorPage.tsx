import React from "react";
import Alert from "@mui/material/Alert";
import EmployeeTable from "../../Componets/EmployeeTable";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./ErrorPage.css";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error: any = useRouteError();

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h1" gutterBottom fontWeight="bold">
                Oops!
            </Typography>

            <Alert severity="error">{error.statusText || error.message}</Alert>
        </Container>
    );
}

export default ErrorPage;
