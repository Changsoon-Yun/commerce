import { createContext, useContext } from 'react';

interface CardContextProps {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const CardContext = createContext<CardContextProps | undefined>(undefined);

export function useCardContext() {
  const value = useContext(CardContext);
  if (!value) {
    throw new Error('useCardContext should be used within CardContext.Provider');
  }

  return value;
}
