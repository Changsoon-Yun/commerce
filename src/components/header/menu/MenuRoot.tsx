import { ReactNode } from 'react';

interface MenuProps {
  children: ReactNode;
}

export default function MenuRoot({ children }: MenuProps) {
  return (
    <>
      <nav className={'z-[100]'}>{children}</nav>
    </>
  );
}
