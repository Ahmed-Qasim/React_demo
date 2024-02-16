import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const adapter = AdapterDayjs;

const App = () => {
    return (
        <SnackbarProvider autoHideDuration={2000}>
            <LocalizationProvider dateAdapter={adapter}>
                <CssBaseline />
                <RouterProvider router={router} />
            </LocalizationProvider>
        </SnackbarProvider>
    );
};

export default App;
