import { Route, Routes } from 'react-router-dom';
import CommonLayout from '@/components/ui/CommonLayout.tsx';
import PrivateRouter from '@/lib/router/PrivateRouter.tsx';
import LoginPage from '@/pages/auth/Login.page.tsx';
import MobileLayout from '@/components/ui/MobileLayout.tsx';
import HomePage from '@/pages/Home.page.tsx';
import RegisterSelectPage from '@/pages/auth/RegisterSelect.page.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import SellerRouter from '@/lib/router/SellerRouter.tsx';
import UserDashBoardPage from '@/pages/dashboard/UserDashBoard.page.tsx';
import UserDashBoardEditPage from '@/pages/dashboard/UserDashBoardEdit.page.tsx';
import SellerDashBoardPage from '@/pages/dashboard/SellerDashBoard.page.tsx';
import SellerProductAddPage from '@/pages/products/SellerProductAdd.page.tsx';
import SellerProductEditPage from '@/pages/products/SellerProductEdit.page.tsx';

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<CommonLayout />}>
          {/*일반 라우트*/}
          <Route path={'/'} element={<HomePage />} />
          {/*권한 필요 라우트*/}
          <Route element={<PrivateRouter />}>
            <Route element={<SellerRouter />}>
              <Route path={'/seller/dashboard'} element={<SellerDashBoardPage />} />
              <Route path={'/seller/product/add'} element={<SellerProductAddPage />} />
              <Route path={'/seller/product/edit'} element={<SellerProductEditPage />} />
            </Route>
          </Route>
        </Route>

        {/*모바일 뷰 라우트*/}
        <Route element={<MobileLayout />}>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register/select'} element={<RegisterSelectPage />} />
          <Route path={'/register/:params'} element={<RegisterPage />} />
          <Route element={<PrivateRouter />}>
            <Route path={'/user/dashboard'} element={<UserDashBoardPage />} />
            <Route path={'/user/dashboard/edit'} element={<UserDashBoardEditPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
