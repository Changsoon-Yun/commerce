import { createContext } from 'react';

interface CardContextProps {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const CardContext = createContext<CardContextProps | undefined>(undefined);
