import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { Link } from 'react-router-dom';

export default function RegisterSelectPage() {
  return (
    <>
      <div className={'pb-6'}>
        <AuthHeading text={'회원가입'} />
        <div className={'flex justify-center gap-4 mt-20'}>
          <Link
            to={'/register/customer'}
            className={
              'flex-1 flex items-center justify-center text-center border-2 border-gray-600 h-40 hover:bg-zinc-200 transition cursor-pointer'
            }>
            <p className={'text-gray-800 block'}>소비자 회원가입</p>
          </Link>
          <Link
            to={'/register/seller'}
            className={
              'flex-1 flex items-center justify-center text-center border-2 border-gray-600 h-40 hover:bg-zinc-200 transition cursor-pointer'
            }>
            <p className={'text-gray-800'}>판매자 회원가입</p>
          </Link>
        </div>
      </div>
    </>
  );
}
