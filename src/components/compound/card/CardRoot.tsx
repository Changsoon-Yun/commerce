import { HTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  to?: string;
}

export default function CardRoot({ children, to, ...rest }: CardRootProps) {
  const navigate = useNavigate();

  const goHandler = () => {
    if (!to) return;
    navigate(to);
  };

  return (
    <>
      <div
        className={
          'relative flex flex-col gap-3 rounded-lg p-2 bg-white transition border border-transparent hover:border-zinc-200 cursor-pointer'
        }
        onClick={goHandler}
        data-testid={'product-card'}
        {...rest}>
        {children}
      </div>
    </>
  );
}
