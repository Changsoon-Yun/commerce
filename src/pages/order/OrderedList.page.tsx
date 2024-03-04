import useGetOrderedProducts from '@/apis/useGetOrderedProducts.ts';
import OrderedListItem from '@/components/products/OrderedListItem.tsx';
import useOrder from '@/hooks/useOrder.ts';
import PageTitle from '@/components/PageTitle.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import NoProduct from '@/components/optimize/NoProduct.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

export default function OrderedListPage() {
  const { products } = useGetOrderedProducts();
  const { cancelOrderById } = useOrder();

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 주문 목록`} desc={'주문 목록 페이지 입니다.'} />
      <Container className={'flex-1'}>
        <PageTitle title={'구매내역'} />
        <NoProduct products={products} title={'구매내역이 없어요'} desc={'구매하러 가실까요?'}>
          <Button>
            <Link to={'/'}>홈으로 가기</Link>
          </Button>
        </NoProduct>
        <div className={'grid grid-cols-1 gap-2'}>
          {products?.map((product) => (
            <OrderedListItem product={product} cancelOrderById={cancelOrderById} key={product.id} />
          ))}
        </div>
      </Container>
    </>
  );
}
