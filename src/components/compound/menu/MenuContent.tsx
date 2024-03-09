import { ReactNode } from 'react';
import useMenuContext from '@/context/useMenuContext.tsx';

interface MenuContentProps {
  children: ReactNode;
}

export default function MenuContent({ children }: MenuContentProps) {
  const { isOpen } = useMenuContext();
  return (
    <>
      <div
        data-testid={'menu-content'}
        style={{ transition: '0.5s', height: 'calc(100vh - 61px)' }}
        className={`${isOpen ? 'left-0' : 'left-[-600px]'} overflow-auto  absolute top-[61px] max-w-lg w-full bg-white`}>
        {children}
      </div>
    </>
  );
}
