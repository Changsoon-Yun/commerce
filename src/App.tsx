import Router from '@/lib/router/Router.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/ui/toaster';
import ErrorFallbackPage from '@/components/optimize/ErrorFallback.page.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import SuspenseFallback from '@/components/optimize/SuspenseFallback.tsx';
import { Suspense } from 'react';
import Providers from './lib/router/Providers';

export default function App() {
  return (
    <>
      <ErrorBoundary fallbackRender={ErrorFallbackPage}>
        <Suspense fallback={<SuspenseFallback />}>
          <Providers>
            <Router />
            <Toaster />
            <ReactQueryDevtools />
          </Providers>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
