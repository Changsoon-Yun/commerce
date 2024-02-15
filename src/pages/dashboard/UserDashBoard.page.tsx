import { useAuth } from '@/apis/useAuth.ts';

export default function UserDashBoardPage() {
  const { storedUserData } = useAuth();
  return (
    <>
      유저 프로필
      <div>{storedUserData?.userName}</div>
    </>
  );
}
