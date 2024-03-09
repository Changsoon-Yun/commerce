import { useContext } from 'react';
import { CardContext } from './CardContext';

export function useCardContext() {
  const value = useContext(CardContext);
  if (!value) {
    throw new Error('useCardContext should be used within CardContext.Provider');
  }

  return value;
}
