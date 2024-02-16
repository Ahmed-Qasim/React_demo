import { createBrowserRouter } from "react-router-dom";
import EmployeeTablePage from "../Pages/EmployeeTable/EmployeeTablePage";
import EmployeeFormPage from "../Pages/EmployeeForm/EmployeeFormPage";
import ErrorPage from "../Pages/Error/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <EmployeeTablePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "employees/:id?",
        element: <EmployeeFormPage />,
        errorElement: <ErrorPage />,
    },
]);
export default router;
