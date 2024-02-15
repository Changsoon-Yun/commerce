import Router from '@/lib/router/Router.tsx';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollTop from '@/utils/ScrollTop.tsx';
import { CartProvider } from '@/context/CartContext.tsx';
import { Toaster } from './components/ui/toaster';
import { FirebaseError } from 'firebase/app';
import { Toast, toast, ToasterToast } from './components/ui/use-toast';
import ErrorFallbackPage from '@/components/optimize/ErrorFallback.page.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import SuspenseFallback from '@/components/optimize/SuspenseFallback.tsx';
import { Suspense } from 'react';

const queryErrorHandler = (
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  },
  e: unknown
) => {
  if (e instanceof FirebaseError) {
    return toast({
      title: '에러!',
      description: e.code,
      variant: 'destructive',
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
  mutationCache: new MutationCache({
    onError: (e) => queryErrorHandler(toast, e),
  }),
});

export default function App() {
  return (
    <>
      <ErrorBoundary fallbackRender={ErrorFallbackPage}>
        <Suspense fallback={<SuspenseFallback />}>
          <QueryClientProvider client={queryClient}>
            <ScrollTop />
            <CartProvider>
              <Router />
              <Toaster />
              <ReactQueryDevtools />
            </CartProvider>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
