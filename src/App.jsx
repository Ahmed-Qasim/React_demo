import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import createMockServer from "./Services/server";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const adapter = AdapterDayjs;

const App = () => {
    useEffect(() => {
        createMockServer();
    }, []);

    return (
        <LocalizationProvider dateAdapter={adapter}>
            <RouterProvider router={router} />
        </LocalizationProvider>
    );
};

export default App;
