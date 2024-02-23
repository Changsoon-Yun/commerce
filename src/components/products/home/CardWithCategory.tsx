import { Link } from 'react-router-dom';
import useGetHomeProducts from '@/apis/useGetHomeProducts.ts';
import { Card } from '../card';
import { formatNumberWithCommas, getDateFromProduct } from '@/utils/converter.ts';
import Container from '@/components/Container.tsx';
import { MdArrowRightAlt } from 'react-icons/md';

interface CardWithCategoryProps {
  category: { label: string; value: string };
}
export default function CardWithCategory({ category }: CardWithCategoryProps) {
  const { products } = useGetHomeProducts(category.value);
  return (
    <>
      <div className={'py-10 mb-2 bg-white'}>
        <Container>
          <div className={'flex justify-between items-center pb-8 gap-4'}>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              <Link
                to={`products/${category.value}`}
                data-testid={`category-link-${category.value}`}>
                <div className={'pb-2'}>{category.label}</div>
              </Link>
            </h3>
            <Link to={`products/${category.value}`} className={'flex items-center gap-1'}>
              <span className={'text-foreground text-sm'}>더보기</span>
              <MdArrowRightAlt />
            </Link>
          </div>
          <div className={'grid grid-cols-2 gap-2'}>
            {products?.map((product) => (
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
                  <Card.Button data-testid={'product-detail-link'} variant={'outline'} asChild>
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
