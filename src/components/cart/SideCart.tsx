import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import CartList from './CartList';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/components/ui/button.tsx';
import useGetCartProducts from '@/apis/useGetCartProducts.ts';

export default function SideCart() {
  const { isOpen, carts, toggleHandler } = useContext(CartContext);
  const { products, mutate } = useGetCartProducts(carts);

  useEffect(() => {
    mutate();
  }, [carts]);
  return (
    <>
      <div
        style={{ height: `calc(100vh - 80px)`, transition: '0.3s' }}
        className={`fixed top-[80px]  w-[300px] transition p-4 border-l border-zinc-200  bg-zinc-100 overflow-auto ${isOpen ? 'right-[0px]' : 'right-[-300px]'}`}>
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
            {products?.map((product) => <CartList key={product.id} product={product} />)}
          </div>
        </div>
        <div>총가격 : {products?.reduce((acc, curr) => acc + curr.price, 0)}</div>
        <Button variant={'outline'} className={'w-full'}>
          구매하기
        </Button>
      </div>
    </>
  );
}
