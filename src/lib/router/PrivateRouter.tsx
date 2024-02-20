import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function PrivateRouter() {
  const { storedUserData } = useAuth();
  if (!storedUserData) {
    alert('로그인이 필요한 기능입니다.');
  }
  return <>{storedUserData ? <Outlet /> : <Navigate to={'/'} />}</>;
}
