import { useContext } from 'react';
import { MenuContext } from '@/context/MenuContext.tsx';

export default function useMenuContext() {
  const value = useContext(MenuContext);
  if (!value) {
    throw new Error('useMenuContext should be used within MenuContext.Provider');
  }

  return value;
}
