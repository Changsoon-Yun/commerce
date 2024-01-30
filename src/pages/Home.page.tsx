import { useAuth } from '@/apis/useAuth.ts';

export default function HomePage() {
  const { storedUserData } = useAuth();

  return <>Home {storedUserData ? '로그인함' : '아님'}</>;
}
