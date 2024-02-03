import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '@/components/ui/Footer.tsx';

export default function CommonLayout() {
  return (
    <>
      <div className={'border-b border-zinc-200 bg-zinc-50'}>
        <div className={'max-w-6xl m-auto'}>
          <Header />
        </div>
      </div>
      <div className={'max-w-6xl m-auto'}>
        <div className={'m-5'}>
          <Outlet />
        </div>
      </div>
      <div className={'border-t border-zinc-200 bg-zinc-50'}>
        <div className={'max-w-6xl m-auto'}>
          <Footer />
        </div>
      </div>
    </>
  );
}
