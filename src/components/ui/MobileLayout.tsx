import { Outlet } from 'react-router-dom';

export default function MobileLayout() {
  return (
    <>
      <div className="bg-zinc-50 flex justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
