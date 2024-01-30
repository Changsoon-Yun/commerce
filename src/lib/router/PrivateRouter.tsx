import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function PrivateRouter() {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Outlet /> : <Navigate to={'/'} />}</>;
}
