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
  }, [carts, mutate]);
  return (
    <>
      <aside
        data-cy={'side-cart'}
        style={{ transition: '0.3s', height: 'calc(100vh - 61px)' }}
        className={`${isOpen ? 'right-0' : 'right-[-600px]'} absolute top-[61px] max-w-lg w-full transition p-4 border-l overflow-auto bg-white`}>
        <div className={'relative'}>
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
            <div className={'grid grid-cols-1 gap-2'} data-cy={'cart-item-list'}>
              {products?.map((product) => <CartList key={product.id} product={product} />)}
            </div>
          </div>
          <div className={'text-right py-4 break-keep whitespace-nowrap'}>
            주문 예상 금액 : {products?.reduce((acc, curr) => acc + curr.price, 0)} 원
          </div>
          <Button
            className={'w-full'}
            asChild
            onClick={() => {
              toggleHandler();
            }}>
            <Link to={'/order/cart'}>구매하기</Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
