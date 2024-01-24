import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter() {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <Outlet /> : <Navigate to={'/'} />}</>;
}
