import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { Link } from 'react-router-dom';
import { Metatags } from '@/metadatas/metadatas.tsx';

export default function RegisterSelectPage() {
  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 회원가입 선택`} desc={'회원가입 선택 페이지 입니다.'} />
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
