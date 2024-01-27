import { useAuth } from '@/apis/useAuth.ts';
import { Navigate, Outlet } from 'react-router-dom';

export default function SellerRouter() {
  const { userInfo } = useAuth();
  return <>{userInfo?.isSeller ? <Outlet /> : <Navigate to={'/'} />}</>;
}
