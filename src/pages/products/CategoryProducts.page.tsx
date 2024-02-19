import { useParams } from 'react-router-dom';
import { convertLabelByValue } from '@/utils/converter.ts';
import useGetCategoryProducts from '@/apis/useGetCategoryProducts.ts';
import { categories } from '@/constant/categories.ts';
import { useCallback, useMemo, useState } from 'react';
import ProductCard from '@/components/products/ProductCard.tsx';
import { IProducts } from '@/types/product.ts';
import CategoryNav from '@/components/products/home/CategoryNav.tsx';
import FilterList from '@/components/products/FilterList.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';

export const filterArr = ['최신순', '오래된순', '낮은 가격순', '높은 가격순'] as const;

export default function CategoryProductsPage() {
  const { category } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('최신순');
  const [option, setOption] = useState<'updatedAt' | 'price'>('updatedAt');
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc');
  const { products, inViewRef, isFetchingNextPage } = useGetCategoryProducts({
    category: category ?? '',
    filter: {
      option,
      direction,
    },
  });

  const onChangeFilterHandler = useCallback(
    (item: string) => {
      switch (item) {
        case '최신순':
          setSelectedFilter(item);
          setOption('updatedAt');
          setDirection('desc');
          break;
        case '오래된순':
          setSelectedFilter(item);
          setOption('updatedAt');
          setDirection('asc');
          break;
        case '낮은 가격순':
          setSelectedFilter(item);
          setOption('price');
          setDirection('asc');
          break;
        case '높은 가격순':
          setSelectedFilter(item);
          setOption('price');
          setDirection('desc');
          break;
      }
    },
    [setSelectedFilter, setOption, setDirection]
  );
  const categoryLabel = useMemo(
    () => convertLabelByValue(category as string, categories),
    [category]
  );

  if (!category) {
    return;
  }

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - ${categoryLabel}`} desc={categoryLabel as string} />
      <div className={'py-10 flex justify-between items-center'}>
        <h2 className="scroll-m-20 tracking-tight first:mt-0 pb-10">
          <span className={'text-3xl font-semibold '}>{categoryLabel}</span>
        </h2>
      </div>
      <div className="flex">
        <CategoryNav />
        <div className={'flex-1'}>
          <FilterList
            selectedFilter={selectedFilter}
            onChangeFilterHandler={onChangeFilterHandler}
          />
          <div className={'grid grid-cols-4  gap-2 '}>
            {products?.pages.map((items, idx) => (
              <ProductCard targetArr={items.products as IProducts[]} key={idx} />
            ))}
          </div>
          <div ref={inViewRef} className="h-42 w-full">
            {isFetchingNextPage && <p>loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
}
