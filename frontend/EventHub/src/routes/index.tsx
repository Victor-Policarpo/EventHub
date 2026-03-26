import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "../pages/Login/Index"
import Register from "../pages/Register/Register"

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }

])