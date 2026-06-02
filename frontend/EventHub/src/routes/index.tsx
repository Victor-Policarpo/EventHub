import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Login, Register, PartyDetails, PartyEditPage, FeedToys, ToyEdit, FeedEmployees, EmployeeEdit, Feed, Profile, CreateEmployee, CreateToy, ForgotPassword, ResetPassword, CreatePartyPage, ManageUsers, DashboardFinance, NotFoundPage } from '../pages';
import { AppLayout } from '../components';

const PrivateRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando sessão...</div>;
  }
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
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

          <Route path="/feed" element={<Feed />} />
          <Route path="/parties/new" element={<CreatePartyPage />} />
          <Route path="/parties/:id" element={<PartyDetails />} />
          <Route path="/parties/:id/edit" element={<PartyEditPage />} />
          <Route path="/toys" element={<FeedToys />} />
          <Route path="/toys/new" element={<CreateToy />} />
          <Route path="/toys/:id/edit" element={<ToyEdit />} /> 
          <Route path="/employees" element={<FeedEmployees />} />
          <Route path="/employees/new" element={<CreateEmployee />} />
          <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};