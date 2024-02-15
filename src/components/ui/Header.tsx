import { Input } from './input';
import { Link } from 'react-router-dom';
import { useAuth } from '@/apis/useAuth.ts';

export default function Header() {
  const { storedUserData } = useAuth();

  return (
    <>
      <div className={'flex justify-between px-5 items-center'}>
        <Link to={'/'}>
          <img src="/img/logo.jpg" alt="logo" width={80} height={80} />
        </Link>
        <Input className={'max-w-md'} type="text" placeholder="검색" />
        {/*<div className={'flex gap-4'}>{storedUserData ? <UserHeader /> : <CommonHeader />}</div>*/}
      </div>
    </>
  );
}
