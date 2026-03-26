import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Public/Index';
import Register from '../pages/Public/Register';
import Feed from '../pages/Private/Feed';
import Profile from '../pages/Private/Profile';

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

      <Route element={<PrivateRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};