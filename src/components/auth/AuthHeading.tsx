import { Link } from 'react-router-dom';

interface AuthHeadingProps {
  text: string;
}
export default function AuthHeading({ text }: AuthHeadingProps) {
  return (
    <>
      <div className={'flex flex-col items-center justify-center'}>
        <Link to={'/'}>
          <img src="/img/logo.jpg" alt="logo" />
        </Link>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center pb-10">
          {text}
        </h2>
      </div>
    </>
  );
}
