import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import SuspenseFallback from '@/components/optimize/SuspenseFallback.tsx';

export default function MobileLayout() {
  return (
    <>
      <div className="bg-zinc-50 flex justify-center min-h-screen">
        <div className={'flex-1 flex justify-center'}>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-full">
            <Suspense fallback={<SuspenseFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
