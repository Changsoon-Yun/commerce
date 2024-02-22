import { useAuth } from '@/apis/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';

export default function UserDashBoardPage() {
  const { storedUserData } = useAuth();

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 유저 프로필`} desc={'유저 프로필 페이지 입니다.'} />
      유저 프로필
      <div className={'bg-white flex-1'}>{storedUserData?.userName}</div>
    </>
  );
}
