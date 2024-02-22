import useGetOrderedProducts from '@/apis/useGetOrderedProducts.ts';
import OrderedListItem from '@/components/products/OrderedListItem.tsx';
import useOrder from '@/hooks/useOrder.ts';
import PageTitle from '@/components/PageTitle.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';

export default function OrderedListPage() {
  const { products } = useGetOrderedProducts();
  const { cancelOrderById } = useOrder();

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 주문 목록`} desc={'주문 목록 페이지 입니다.'} />
      <Container>
        <PageTitle title={'구매내역'} />
        <div className={'grid grid-cols-1 gap-2'}>
          {products?.map((product) => (
            <OrderedListItem product={product} cancelOrderById={cancelOrderById} key={product.id} />
          ))}
        </div>
      </Container>
    </>
  );
}
