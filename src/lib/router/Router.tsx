import { Route, Routes } from 'react-router-dom';
import CommonLayout from '@/components/ui/CommonLayout.tsx';
import PrivateRouter from '@/lib/router/PrivateRouter.tsx';
import Login from '@/pages/auth/Login.tsx';
import Priv from '@/pages/Priv.tsx';
import MobileLayout from '@/components/ui/MobileLayout.tsx';
import Home from '@/pages/Home';

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<CommonLayout />}>
          {/*일반 라우트*/}
          <Route path={'/'} element={<Home />} />
          {/*권한 필요 라우트*/}
          <Route element={<PrivateRouter />}>
            <Route path={'priv'} element={<Priv />} />
          </Route>
        </Route>

        {/*모바일 뷰 라우트*/}
        <Route element={<MobileLayout />}>
          <Route path={'/login'} element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
