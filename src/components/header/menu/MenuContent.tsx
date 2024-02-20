import { ReactNode, useContext } from 'react';
import { MenuContext } from '@/context/MenuContext.tsx';

interface MenuContentProps {
  children: ReactNode;
}

export default function MenuContent({ children }: MenuContentProps) {
  const { isOpen } = useContext(MenuContext);
  return (
    <>
      <div
        style={{ transition: '0.5s' }}
        className={`${isOpen ? 'left-0' : 'left-[-600px]'}  absolute top-[61px] h-screen max-w-lg w-full bg-white`}>
        {children}
      </div>
    </>
  );
}
