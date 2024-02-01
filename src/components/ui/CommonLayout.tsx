import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function CommonLayout() {
  return (
    <>
      <div className={'border-b border-zinc-200'}>
        <div className={'max-w-5xl m-auto'}>
          <Header />
        </div>
      </div>
      <div className={'max-w-5xl m-auto'}>
        <div className={'m-5'}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
