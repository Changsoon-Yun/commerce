import { Link, useParams } from 'react-router-dom';
import useGetProduct from '@/apis/useGetProduct.ts';
import { formatNumberWithCommas, getDateFromProduct } from '@/utils/converter.ts';
import useGetRelatedProducts from '@/apis/useGetRelatedProducts.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';
import { Card } from '@/components/compound/card';
import DetailProduct from '@/components/products/detail/DetailProduct.tsx';
import Container from '@/components/Container.tsx';

export default function DetailProductPage() {
  const { id } = useParams() as { id: string };
  const { product } = useGetProduct(id);
  const { products: recommendedProducts } = useGetRelatedProducts(
    product?.category as string,
    id as string
  );

  if (!product) {
    return;
  }

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - ${product.title}`} desc={product.desc} />
      <div>
        <Container>
          <DetailProduct product={product} />
        </Container>
        <Container>
          <div className={'py-8 mb-2 text-zinc-800 text-2xl font-semibold'}>연관 상품</div>
        </Container>
        <Container>
          <div className={'grid gap-2 grid-cols-2'}>
            {recommendedProducts?.map((product) => (
              <Card.Root key={product.id} to={`/product/${product.id}`}>
                <Card.Img imageList={product.imageList} />
                <Card.Title title={product.title} />
                <Card.Description
                  data-testid={'product-price'}
                  text={formatNumberWithCommas(product.price) + '원'}
                />
                <Card.Description
                  data-testid={'product-date'}
                  text={getDateFromProduct(product.updatedAt)}
                  className={'hidden'}
                />
                <Card.Buttons>
                  <Card.Button data-testid={'product-detail-link'} variant={'outline'}>
                    <Link to={`/product/${product.id}`}>상세보기</Link>
                  </Card.Button>
                </Card.Buttons>
              </Card.Root>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
