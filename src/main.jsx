import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const adapter = AdapterDayjs;

ReactDOM.createRoot(document.getElementById("root")).render(
    <LocalizationProvider dateAdapter={adapter}>
        <RouterProvider router={router} />
    </LocalizationProvider>
);
