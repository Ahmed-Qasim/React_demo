import { createBrowserRouter } from "react-router-dom";
import EmployeeTablePage from "../Pages/EmployeeTable/EmployeeTablePage";
import EmployeeFormPage from "../Pages/EmployeeForm/EmployeeFormPage";
import ErrorPage from "../Pages/Error/ErrorPage";
import Display from "../Test/Display";
import Form from "../Test/Form";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <EmployeeTablePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "entry/:id?",
        element: <EmployeeFormPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "test",
        element: <Display />,
        errorElement: <ErrorPage />,
    },
    {
        path: "form",
        element: <Form />,
        errorElement: <ErrorPage />,
    },
]);
export default router;
