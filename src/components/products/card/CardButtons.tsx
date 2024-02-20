import { ReactNode } from 'react';

interface CardButtonsProps {
  children: ReactNode;
}

export default function CardButtons({ children }: CardButtonsProps) {
  return (
    <>
      <div className={'flex justify-between gap-2'}>{children}</div>
    </>
  );
}
