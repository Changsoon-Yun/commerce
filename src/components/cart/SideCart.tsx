import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import CartList from './CartList';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/components/ui/button.tsx';

export default function SideCart() {
  const { isOpen, carts, toggleHandler } = useContext(CartContext);

  return (
    <>
      <div
        style={{ height: `calc(100vh - 80px)` }}
        className={`fixed top-[80px] w-[300px] p-4 border-l border-zinc-200  bg-zinc-300 overflow-auto ${isOpen ? 'right-[0px]' : 'right-[-300px]'}`}>
        <div className={'relative'}>
          <div className={'absolute top-3 right-0'}>
            <IoMdClose
              className={'cursor-pointer'}
              size={24}
              onClick={() => {
                toggleHandler();
              }}
            />
          </div>
          <h2 className="scroll-m-20 py-10 text-3xl font-semibold tracking-tight first:mt-0 text-center">
            장바구니
          </h2>
          <div className={'flex gap-2 flex-wrap py-4'}>
            {carts.map((id) => (
              <CartList id={id} key={id} />
            ))}
          </div>
        </div>
        <Button variant={'outline'} className={'w-full'}>
          구매하기
        </Button>
      </div>
    </>
  );
}
