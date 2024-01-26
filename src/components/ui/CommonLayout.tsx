import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function CommonLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
