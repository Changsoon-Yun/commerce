import { MdChevronLeft } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MobileLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-zinc-50 flex justify-center min-h-screen">
        <div className={'flex-1 flex justify-center'}>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-full">
            <header>
              <div
                className={'cursor-pointer'}
                onClick={() => {
                  navigate(-1);
                }}>
                <MdChevronLeft size={30} />
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
