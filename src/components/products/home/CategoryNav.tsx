import { categories } from '@/constant/categories.ts';
import { Link, useParams } from 'react-router-dom';
import Container from '@/components/Container.tsx';
import useMenuContext from '@/context/useMenuContext.tsx';

export default function CategoryNav() {
  const { category: currentLocation } = useParams();
  const { closeMenuHandler } = useMenuContext();
  return (
    <>
      <div className={'flex gap-2 py-2 max-w-[600px] items-center bg-white'}>
        <Container>
          <div className={'flex overflow-auto gap-2 flex-wrap'}>
            {categories.map((category) => (
              <div
                className={'p-2 border rounded hover:bg-zinc-100 cursor-pointer'}
                key={category.value}
                onClick={closeMenuHandler}>
                <Link to={`/products/${category.value}`}>
                  <div
                    className={`${currentLocation === category.value ? 'font-semibold' : ''} break-keep whitespace-nowrap hover:font-semibold transition `}>
                    {category.label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
