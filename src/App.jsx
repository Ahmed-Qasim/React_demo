import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const adapter = AdapterDayjs;

const App = () => {
    return (
        <LocalizationProvider dateAdapter={adapter}>
            <RouterProvider router={router} />
        </LocalizationProvider>
    );
};

export default App;
