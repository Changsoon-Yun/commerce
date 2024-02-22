import { categories } from '@/constant/categories.ts';
import CardWithCategory from '@/components/products/home/CardWithCategory.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';
import PageTitle from '@/components/PageTitle.tsx';

export default function HomePage() {
  return (
    <>
      <Metatags
        title={'Seconds: 중고거래'}
        desc={'Seconds: 중고거래 - 중고거래 플랫폼입니다. 최고의 중고 상품을 찾아보세요!'}
      />
      <PageTitle
        title={
          <div>
            <span className={'text-2xl pr-2'} data-testid={'home'}>
              카테고리별
            </span>
            <span className={'text-3xl font-semibold '}>추천 상품</span>
          </div>
        }
      />
      {categories.map((category) => (
        <div key={category.value} data-testid={'category-product-list'}>
          <CardWithCategory category={category} />
        </div>
      ))}
    </>
  );
}
