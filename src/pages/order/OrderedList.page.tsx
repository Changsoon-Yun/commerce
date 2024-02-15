import useGetOrderedProducts from '@/apis/useGetOrderedProducts.ts';
import OrderedListItem from '@/components/products/OrderedListItem.tsx';
import useOrder from '@/hooks/useOrder.ts';
import PageTitle from '@/components/PageTitle.tsx';

export default function OrderedListPage() {
  const { products } = useGetOrderedProducts();
  const { cancelOrderById } = useOrder();

  console.log(products);
  return (
    <>
      <div className={'py-16'}>
        <PageTitle title={'구매내역'} />
        <div>
          {products?.map((product) => (
            <OrderedListItem product={product} cancelOrderById={cancelOrderById} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
