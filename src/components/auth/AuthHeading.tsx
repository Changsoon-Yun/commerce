import { Link } from 'react-router-dom';

interface AuthHeadingProps {
  text: string;
}
export default function AuthHeading({ text }: AuthHeadingProps) {
  return (
    <>
      <div className={'flex flex-col items-center justify-center'}>
        <Link to={'/'}>
          <picture>
            <source srcSet="/img/logo.webp" type="image/webp" />
            <img src="/img/logo.jpg" alt="logo" />
          </picture>
        </Link>
        <h2
          data-testid={'heading-text'}
          className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center pb-10">
          {text}
        </h2>
      </div>
    </>
  );
}
