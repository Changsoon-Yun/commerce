import { categories } from '@/constant/categories.ts';
import { Link, useParams } from 'react-router-dom';

export default function CategoryNav() {
  const { category: currentLocation } = useParams();

  return (
    <>
      <nav className={'sticky top-40 pr-5 flex flex-col gap-2 min-w-[130px] h-fit'}>
        <p className={'font-semibold'}>카테고리</p>
        {categories.map((category) => (
          <Link to={`/products/${category.value}`} key={category.value}>
            <div className={'cursor-pointer hover:font-semibold transition'}>
              <small className={` ${currentLocation === category.value ? 'font-semibold' : ''}`}>
                {category.label}
              </small>
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}
