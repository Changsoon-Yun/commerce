import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import { Button } from '@/components/ui/button.tsx';
import CartList from './CartList';

export default function SideCart() {
  const { isOpen, carts, toggleHandler } = useContext(CartContext);

  return (
    <>
      <div
        style={{ height: `calc(100vh - 80px)` }}
        className={`fixed top-[80px] w-[300px] px-4 border-l border-zinc-200  bg-zinc-50 overflow-auto ${isOpen ? 'right-[0px]' : 'right-[-300px]'}`}>
        <div className={'relative'}>
          <Button
            onClick={() => {
              toggleHandler();
            }}>
            닫기
          </Button>
          <h2 className="scroll-m-20 py-10 text-3xl font-semibold tracking-tight first:mt-0 text-center">
            찜한 목록
          </h2>
          <div className={'flex gap-2 flex-wrap'}>
            {carts.map((id) => (
              <CartList id={id} key={id} />
            ))}
          </div>
          <div>총 가격 : 어떻게 암</div>
        </div>
      </div>
    </>
  );
}
