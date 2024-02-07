import { useParams } from 'react-router-dom';
import { convertLabelByValue } from '@/utils/converter.ts';
import useGetCategoryProducts from '@/apis/useGetCategoryProducts.ts';
import { categories } from '@/constant/categories.ts';
import { Fragment, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';
import ProductCard from '@/components/products/ProductCard.tsx';
import { IProducts } from '@/apis/useGetSellerProducts.ts';

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

  const filterArr = ['최신순', '오래된순', '낮은 가격순', '높은 가격순'];

  const onChangeFilterHandler = (item: string) => {
    console.log('item', item);
    console.log('selectedFilter', selectedFilter);
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
  };

  if (!category) {
    return;
  }

  return (
    <>
      <div className={'py-10 flex justify-between items-center'}>
        <h2 className="scroll-m-20 tracking-tight first:mt-0 pb-10">
          <span className={'text-3xl font-semibold '}>
            {convertLabelByValue(category, categories)}
          </span>
        </h2>
      </div>
      <div className="flex">
        <div className={'pr-5 flex flex-col gap-2 min-w-[120px]'}>
          <RadioGroup
            defaultValue={filterArr[0]}
            className={'flex flex-col gap-4'}
            onValueChange={onChangeFilterHandler}>
            {filterArr.map((item) => (
              <div className="flex items-center space-x-2" key={item}>
                <RadioGroupItem value={item} id={item} className={'hidden'} />
                <Label
                  htmlFor={item}
                  className={`cursor-pointer pb-1 ${selectedFilter === item ? 'font-bold border-b border-gray-600' : 'font-medium'}`}>
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className={'flex-1'}>
          <div className={'flex flex-wrap gap-2 justify-between '}>
            {products?.pages.map((items, idx) => (
              <Fragment key={idx}>
                <ProductCard targetArr={items.products as IProducts[]} />
              </Fragment>
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
