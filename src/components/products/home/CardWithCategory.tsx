import { Link } from 'react-router-dom';
import useGetHomeProducts from '@/apis/useGetHomeProducts.ts';
import { Separator } from '@/components/ui/separator.tsx';
import ProductCard from '../ProductCard';
import { IProducts } from '@/apis/useGetSellerProducts.ts';

interface CardWithCategoryProps {
  category: { label: string; value: string };
}
export default function CardWithCategory({ category }: CardWithCategoryProps) {
  const { products } = useGetHomeProducts(category.value);
  return (
    <>
      <div className={'pb-20'}>
        <div className={'flex flex-col justify-center items-center pb-8 gap-4'}>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            <Link to={`products/${category.value}`}>
              <div className={'pb-2'}>{category.label}</div>
            </Link>
            <Separator className={'h-0.5 bg-zinc-300'} />
          </h3>
        </div>

        <div className={'flex gap-2'}>
          <ProductCard targetArr={products as IProducts[]} />
        </div>
      </div>
    </>
  );
}
