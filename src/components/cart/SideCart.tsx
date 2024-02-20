import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import CartList from './CartList';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/components/ui/button.tsx';
import useGetCartProducts from '@/apis/useGetCartProducts.ts';
import { Link } from 'react-router-dom';

export default function SideCart() {
  const { isOpen, carts, toggleHandler } = useContext(CartContext);
  const { products, mutate } = useGetCartProducts(carts);

  useEffect(() => {
    mutate();
  }, [carts]);
  return (
    <>
      <aside
        data-cy={'side-cart'}
        style={{ transition: '0.3s' }}
        className={`${isOpen ? 'right-0' : 'right-[-600px]'} absolute top-[61px] h-screen  max-w-lg w-full transition p-4 border-l overflow-auto bg-white`}>
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
          <div className={'flex gap-2 flex-wrap py-4'} data-cy={'cart-item-list'}>
            {products?.map((product) => <CartList key={product.id} product={product} />)}
          </div>
        </div>
        <div>총가격 : {products?.reduce((acc, curr) => acc + curr.price, 0)}</div>
        <Button
          variant={'outline'}
          className={'w-full'}
          asChild
          onClick={() => {
            toggleHandler();
          }}>
          <Link to={'/order/cart'}>구매하기</Link>
        </Button>
      </aside>
    </>
  );
}
