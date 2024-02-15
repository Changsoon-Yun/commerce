import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '@/components/ui/Footer.tsx';
import SideCart from '@/components/cart/SideCart.tsx';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';

export default function CommonLayout() {
  const { isOpen, toggleHandler } = useContext(CartContext);
  return (
    <>
      <div className={`relative`}>
        <header className={'sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50'}>
          <div className={'max-w-6xl m-auto'}>
            <Header />
          </div>
        </header>
        <main className={'max-w-6xl m-auto min-h-screen'}>
          <div className={'m-5'}>
            <Outlet />
          </div>
        </main>
        <footer className={'border-t border-zinc-200 bg-zinc-50'}>
          <div className={'max-w-6xl m-auto'}>
            <Footer />
          </div>
        </footer>
        <div
          onClick={toggleHandler}
          className={`dim fixed top-0 left-0 w-screen h-screen ${isOpen ? 'bg-black opacity-25' : 'hidden'}`}></div>
        <SideCart />
      </div>
    </>
  );
}
