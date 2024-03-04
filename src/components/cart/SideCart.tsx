import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import CartList from './CartList';
import { IoMdClose } from 'react-icons/io';
import useGetCartProducts from '@/apis/useGetCartProducts.ts';
import { Link, useLocation } from 'react-router-dom';
import CardButton from '@/components/products/card/CardButton.tsx';
import NoProduct from '@/components/optimize/NoProduct.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function SideCart() {
  const { isOpen, carts, toggleHandler, closeHandler } = useContext(CartContext);
  const { pathname } = useLocation();
  const { products, mutate } = useGetCartProducts(carts);

  useEffect(() => {
    mutate();
  }, [carts, mutate]);

  useEffect(() => {
    closeHandler();
  }, [closeHandler, pathname]);

  return (
    <>
      <aside
        data-testid={'side-cart'}
        style={{ transition: '0.3s', height: 'calc(100vh - 61px)' }}
        className={`${isOpen ? 'right-0' : 'right-[-600px]'} absolute top-[61px] max-w-lg w-full transition p-4 border-l overflow-auto bg-white`}>
        <div className={'relative'}>
          <div className={'relative'}>
            <h2 className="scroll-m-20 py-10 text-3xl font-semibold tracking-tight first:mt-0 text-center">
              장바구니
            </h2>
            <div className={'absolute top-12 right-0'}>
              <IoMdClose
                className={'cursor-pointer'}
                size={24}
                onClick={() => {
                  toggleHandler();
                }}
              />
            </div>
          </div>
          {products?.length === 0 ? (
            <NoProduct
              products={products}
              title={'장바구니에 상품이 없어요!'}
              desc={'찜해보는건 어떠신가요?'}>
              <Button>
                <Link to={'/'}>홈으로 가기</Link>
              </Button>
            </NoProduct>
          ) : (
            <div>
              <div className={'grid grid-cols-2 gap-2'} data-testid={'cart-item-list'}>
                {products?.map((product) => <CartList key={product.id} product={product} />)}
              </div>
              <div className={'text-right py-4 break-keep whitespace-nowrap'}>
                주문 예상 금액 : {products?.reduce((acc, curr) => acc + curr.price, 0)} 원
              </div>
              <CardButton
                className={'w-full'}
                asChild
                onClick={() => {
                  toggleHandler();
                }}>
                <Link to={'/order/cart'}>구매하기</Link>
              </CardButton>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
