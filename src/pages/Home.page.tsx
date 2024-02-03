import { categories } from '@/constant/categories.ts';
import CardWithCategory from '@/components/products/home/CardWithCategory.tsx';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <div className={'py-10 flex justify-between items-center'}>
        <h2 className="scroll-m-20 tracking-tight first:mt-0 pb-10">
          <span className={'text-2xl '}>카테고리별 </span>
          <span className={'text-3xl font-semibold '}>추천 상품</span>
        </h2>
        <div className={'flex gap-4'}>
          <FaFacebookF className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaInstagram className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaTwitter className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
        </div>
      </div>
      <div className={'flex'}>
        <div className={'pr-5 flex flex-col gap-2 min-w-[120px]'}>
          <p className={'font-semibold'}>카테고리</p>
          {categories.map((category) => (
            <Link to={`products/${category.value}`} key={category.value}>
              <div className={'cursor-pointer hover:font-semibold transition'}>
                <small>{category.label}</small>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {categories.map((category) => (
            <div key={category.value}>
              <CardWithCategory category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
