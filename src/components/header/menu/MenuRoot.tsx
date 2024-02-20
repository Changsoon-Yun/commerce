import { ReactNode } from 'react';

interface MenuProps {
  children: ReactNode;
}

export default function MenuRoot({ children }: MenuProps) {
  return (
    <>
      <nav>{children}</nav>
    </>
  );
}
