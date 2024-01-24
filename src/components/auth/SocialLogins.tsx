export default function SocialLogins() {
  return (
    <>
      <div className={'flex flex-col gap-4 mt-8'}>
        <button
          className={
            'flex py-2 justify-center gap-2 items-center rounded-xl w-full bg-transparent border-2'
          }>
          <img src="src/assets/g-logo.png" alt="google" className={'w-5 h-5'} />
          <p className="font-semibold text-zinc-600 text-sm">구글로 시작하기</p>
        </button>
        <button
          className={'flex justify-center gap-2 items-center rounded-xl w-full'}
          style={{ backgroundColor: '#F7E409', border: '1px solid #F7E409' }}>
          <img src="src/assets/k-logo.png" alt="kakao" className={'w-10 h-10'} />
          <p className="font-semibold text-sm" style={{ marginLeft: '-10px' }}>
            카카오로 시작하기
          </p>
        </button>
        <button
          className={
            'flex py-2 justify-center gap-2 items-center rounded-xl w-full bg-transparent border-2'
          }>
          <img src="src/assets/git-logo.png" alt="google" className={'w-5 h-5 ml-3'} />
          <p className="font-semibold text-sm">깃허브로 시작하기</p>
        </button>
      </div>
    </>
  );
}
