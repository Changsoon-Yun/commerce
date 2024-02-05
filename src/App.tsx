import Router from '@/lib/router/Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollTop from '@/utils/ScrollTop.tsx';
import { CartProvider } from '@/context/CartContext.tsx';

export const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollTop />
        <CartProvider>
          <Router />
          <ReactQueryDevtools />
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}
