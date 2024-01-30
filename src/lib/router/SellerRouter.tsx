import { useAuth } from '@/apis/useAuth.ts';
import { Navigate, Outlet } from 'react-router-dom';

export default function SellerRouter() {
  const { storedUserData } = useAuth();
  return <>{storedUserData?.isSeller ? <Outlet /> : <Navigate to={'/'} />}</>;
}
