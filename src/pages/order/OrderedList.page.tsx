import useGetOrderedProducts from '@/apis/useGetOrderedProducts.ts';
import OrderedListItem from '@/components/products/OrderedListItem.tsx';
import useOrder from '@/hooks/useOrder.ts';

export default function OrderedListPage() {
  const { products } = useGetOrderedProducts();
  const { cancelOrderById } = useOrder();

  console.log(products);
  return (
    <>
      <>
        <div className={'flex flex-col items-center justify-center pt-10'}>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center pb-10">
            구매내역
          </h2>
        </div>
      </>
      <div>
        {products?.map((product) => (
          <OrderedListItem product={product} cancelOrderById={cancelOrderById} key={product.id} />
        ))}
      </div>
    </>
  );
}
