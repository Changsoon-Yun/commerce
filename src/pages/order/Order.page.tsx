import { Button } from '@/components/ui/button.tsx';
import useOrder from '@/hooks/useOrder.ts';
import { formatNumberWithCommas } from '@/utils/converter.ts';
import { useParams } from 'react-router-dom';
import OrderItem from '@/components/products/OrderItem';
import useGetProduct from '@/apis/useGetProduct.ts';
import { IProducts } from '@/apis/useGetSellerProducts.ts';
import { useEffect } from 'react';

export default function OrderPage() {
  const { id: pathName } = useParams();
  const { product } = useGetProduct({ id: pathName });
  const {
    onClickPayment,
    products: cartProducts,
    checkItems,
    setCheckItems,
    handleSingleCheck,
  } = useOrder();

  useEffect(() => {
    if (product) {
      setCheckItems([product]);
    }
  }, [product]);

  useEffect(() => {
    if (pathName === 'cart') {
      if (cartProducts) {
        setCheckItems([...cartProducts]);
      }
    }
  }, [cartProducts]);
  return (
    <>
      <div className={'flex'}>
        <div className={'w-[800px] mr-4'}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight  border border-zinc-300 rounded-t-md  p-4">
            찜한 상품 목록
          </h4>
          {cartProducts?.map((item) => (
            <OrderItem
              item={item}
              handleSingleCheck={handleSingleCheck}
              checkItems={checkItems}
              key={item.id}
            />
          ))}
          {pathName !== 'cart' && product && (
            <>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight  border border-t-0 border-zinc-300 p-4">
                방금 보신 상품
              </h4>
              <OrderItem
                item={product as IProducts}
                handleSingleCheck={handleSingleCheck}
                checkItems={checkItems}
              />
            </>
          )}
        </div>
        <div className={'flex-1 sticky top-[100px] h-fit'}>
          <div className={'flex flex-col gap-4 border border-zinc-300 rounded-t-md p-4'}>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">주문 예상 금액</h4>
            <div>
              <div className={'flex justify-between gap-2'}>
                <p>총 상품 가격</p>
                <p>
                  {formatNumberWithCommas(checkItems.reduce((prev, curr) => prev + curr.price, 0))}{' '}
                  원
                </p>
              </div>
            </div>
            <div>
              <Button
                className={'w-full'}
                onClick={onClickPayment}
                disabled={
                  formatNumberWithCommas(
                    checkItems.reduce((prev, curr) => prev + curr.price, 0)
                  ) === '0'
                }>
                결제하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
