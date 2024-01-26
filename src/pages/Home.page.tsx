import { useAuth } from '@/apis/useAuth.ts';

export default function HomePage() {
  const { isLoggedIn } = useAuth();

  return <>Home {isLoggedIn ? '로그인함' : '아님'}</>;
}
