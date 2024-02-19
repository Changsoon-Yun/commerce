import { categories } from '@/constant/categories.ts';
import CardWithCategory from '@/components/products/home/CardWithCategory.tsx';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import CategoryNav from '@/components/products/home/CategoryNav.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';

export default function HomePage() {
  return (
    <>
      <Metatags
        title={'Seconds: 중고거래'}
        desc={'Seconds: 중고거래 - 중고거래 플랫폼입니다. 최고의 중고 상품을 찾아보세요!'}
      />
      <div className={'py-10 flex justify-between items-center'}>
        <h2 className="scroll-m-20 tracking-tight first:mt-0 pb-10">
          <span className={'text-2xl '} data-cy={'home'}>
            카테고리별{' '}
          </span>
          <span className={'text-3xl font-semibold '}>추천 상품</span>
        </h2>
        <div className={'flex gap-4'}>
          <FaFacebookF className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaInstagram className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaTwitter className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
        </div>
      </div>
      <div className={'flex'}>
        <CategoryNav />
        <div className={'flex-1'}>
          {categories.map((category) => (
            <div key={category.value} data-cy={'category-product-list'}>
              <CardWithCategory category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
