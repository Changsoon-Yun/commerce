import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardRootProps {
  children: ReactNode;
  to?: string;
}

export default function CardRoot({ children, to }: CardRootProps) {
  const navigate = useNavigate();

  const goHandler = () => {
    if (!to) return;
    navigate(to);
  };
  return (
    <>
      <div
        className={
          'relative flex flex-col gap-4 cursor-pointer rounded-lg p-2 bg-white transition border border-transparent hover:border-zinc-200'
        }
        onClick={goHandler}
        data-cy={'product-card'}>
        {children}
      </div>
    </>
  );
}
