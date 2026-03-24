import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Index";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/",
        element: <Navigate to={"/login"} replace/>
    },
    {
        path: "/register",
        element: <Register/>,
    },
]);

export function AppRouter(){
    return <RouterProvider router={router}/>
}