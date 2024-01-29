import { useAuth } from '@/apis/useAuth.ts';

export default function UserDashBoardPage() {
  const { userInfo } = useAuth();
  return (
    <>
      유저 프로필
      <div>{userInfo?.userName}</div>
    </>
  );
}
