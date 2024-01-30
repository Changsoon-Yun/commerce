import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function PrivateRouter() {
  const { storedUserData } = useAuth();
  return <>{storedUserData ? <Outlet /> : <Navigate to={'/'} />}</>;
}
