import { createBrowserRouter } from "react-router-dom";
import EmployeeQueryPage from "../Pages/EmployeeQuery/EmployeeQueryPage";
import EmployeeEntryPage from "../Pages/EmployeeEntry/EmployeeEntryPage";
//import ErrorPage from "../Pages/ErrorPage/ErrorPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <EmployeeQueryPage />,
        // errorElement: <ErrorPage />,
    },
    {
        path: "entry/:id?",
        element: <EmployeeEntryPage />,
    },
]);
export default router;
