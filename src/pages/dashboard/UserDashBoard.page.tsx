import { useAuth } from '@/apis/useAuth.ts';

export default function UserDashBoardPage() {
  const { userData } = useAuth();
  return (
    <>
      유저 프로필
      <div>{userData?.userName}</div>
    </>
  );
}
