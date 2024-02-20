import { CartProvider } from '@/context/CartContext';
import { MenuProvider } from '@/context/MenuContext';
import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/queryClient.ts';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MenuProvider>
          <CartProvider>{children}</CartProvider>
        </MenuProvider>
      </QueryClientProvider>
    </>
  );
}
