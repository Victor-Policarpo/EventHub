import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import { AppLayout } from "../components";
import { Loading } from "../components/Ui";

const Login = lazy(() =>
    import("../pages/Public/Login").then((m) => ({
        default: m.Login,
    }))
);

const Register = lazy(() =>
    import("../pages/Public/Register").then((m) => ({
        default: m.Register,
    }))
);

const ForgotPassword = lazy(() =>
    import("../pages/Public/ForgotPassword").then((m) => ({
        default: m.ForgotPassword,
    }))
);

const ResetPassword = lazy(() =>
    import("../pages/Public/ResetPassword").then((m) => ({
        default: m.ResetPassword,
    }))
);

const NotFoundPage = lazy(() =>
    import("../pages/Public/NotFoundPage").then((m) => ({
        default: m.NotFoundPage,
    }))
);

const DashboardFinance = lazy(() =>
    import("../pages/Private/DashboardFinance").then((m) => ({
        default: m.DashboardFinance,
    }))
);

const Profile = lazy(() =>
    import("../pages/Private/Profile").then((m) => ({
        default: m.Profile,
    }))
);

const ManageUsers = lazy(() =>
    import("../pages/Private/ManageUsers").then((m) => ({
        default: m.ManageUsers,
    }))
);

const Parties = lazy(() =>
    import("../pages/Private/Parties").then((m) => ({
        default: m.Parties,
    }))
);

const CreatePartyPage = lazy(() =>
    import("../pages/Private/CreatePartyPage").then((m) => ({
        default: m.CreatePartyPage,
    }))
);

const PartyDetails = lazy(() =>
    import("../pages/Private/PartyDetails").then((m) => ({
        default: m.PartyDetails,
    }))
);

const PartyEditPage = lazy(() =>
    import("../pages/Private/PartyEditPage").then((m) => ({
        default: m.PartyEditPage,
    }))
);

const FeedToys = lazy(() =>
    import("../pages/Private/FeedToys").then((m) => ({
        default: m.FeedToys,
    }))
);

const CreateToy = lazy(() =>
    import("../pages/Private/CreateToy").then((m) => ({
        default: m.CreateToy,
    }))
);

const ToyEdit = lazy(() =>
    import("../pages/Private/ToyEdit").then((m) => ({
        default: m.ToyEdit,
    }))
);

const FeedEmployees = lazy(() =>
    import("../pages/Private/FeedEmployees").then((m) => ({
        default: m.FeedEmployees,
    }))
);

const CreateEmployee = lazy(() =>
    import("../pages/Private/CreateEmployee").then((m) => ({
        default: m.CreateEmployee,
    }))
);

const EmployeeEdit = lazy(() =>
    import("../pages/Private/EmployeeEdit").then((m) => ({
        default: m.EmployeeEdit,
    }))
);

const PrivateRoute = () => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route element={<PrivateRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<DashboardFinance />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<ManageUsers />} />

                        <Route path="/parties" element={<Parties />} />
                        <Route path="/parties/new" element={<CreatePartyPage />} />
                        <Route path="/parties/:partyId" element={<PartyDetails />} />
                        <Route path="/parties/:partyId/edit" element={<PartyEditPage />} />

                        <Route path="/toys" element={<FeedToys />} />
                        <Route path="/toys/new" element={<CreateToy />} />
                        <Route path="/toys/:toyId/edit" element={<ToyEdit />} />

                        <Route path="/employees" element={<FeedEmployees />} />
                        <Route path="/employees/new" element={<CreateEmployee />} />
                        <Route path="/employees/:employeeId/edit" element={<EmployeeEdit />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};