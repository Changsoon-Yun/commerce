import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function PrivateRouter() {
  const { isLoggedIn } = useAuth();
  console.log('isLoggedIn', isLoggedIn);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to={'/'} />}</>;
}
