import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <div className={'flex-1 bg-white'}>
        <Outlet />
      </div>
    </>
  );
}
