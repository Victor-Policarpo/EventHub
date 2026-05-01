import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Login, Register, PartyDetails, PartyEdit, FeedToys, ToyEdit, FeedEmployees, EmployeeEdit, Feed, Profile } from '../pages';

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
        <Route path="/feed" element={< Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/parties/:partyId" element={<PartyDetails />} />
        <Route path="/parties/:partyId/edit" element={<PartyEdit />} />
        <Route path='/feed/toys' element={<FeedToys/>}/>
        <Route path='toys/:toyId' element={<ToyEdit/>}/>
        <Route path='/feed/employees' element={<FeedEmployees/>}/>
        <Route path='/employees/:employeeId' element={<EmployeeEdit/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};