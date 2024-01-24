import { Route, Routes } from 'react-router-dom';
import CommonLayout from '@/components/ui/CommonLayout.tsx';
import PrivateRouter from '@/lib/router/PrivateRouter.tsx';
import LoginPage from '@/pages/auth/Login.page.tsx';
import Priv from '@/pages/Priv.tsx';
import MobileLayout from '@/components/ui/MobileLayout.tsx';
import HomePage from '@/pages/Home.page.tsx';
import RegisterSelectPage from '@/pages/auth/RegisterSelect.page.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<CommonLayout />}>
          {/*일반 라우트*/}
          <Route path={'/'} element={<HomePage />} />
          {/*권한 필요 라우트*/}
          <Route element={<PrivateRouter />}>
            <Route path={'priv'} element={<Priv />} />
          </Route>
        </Route>

        {/*모바일 뷰 라우트*/}
        <Route element={<MobileLayout />}>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register/select'} element={<RegisterSelectPage />} />
          <Route path={'/register/:params'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}
