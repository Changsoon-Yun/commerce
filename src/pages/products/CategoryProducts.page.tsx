import { Link, useParams } from 'react-router-dom';
import { convertLabelByValue, formatNumberWithCommas } from '@/utils/converter.ts';
import useGetCategoryProducts from '@/apis/useGetCategoryProducts.tsx';
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Button } from '@/components/ui/button.tsx';
import { categories } from '@/constant/categories.ts';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';

export default function CategoryProductsPage() {
  const { category } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('최신순');
  const [option, setOption] = useState<'updatedAt' | 'price'>('updatedAt');
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc');
  const { products } = useGetCategoryProducts({
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
        <div className={'min-h-screen'}>
          <div className={'flex gap-2 flex-wrap '}>
            {products?.map(({ title, imageList, id, price }) => (
              <Card className="flex-1 w-[240px] max-w-[240px] min-w-[240px]" key={id}>
                <div>
                  <Carousel className="w-full max-w-xs" opts={{ active: imageList.length > 1 }}>
                    <CarouselContent>
                      {imageList.map((src, index) => (
                        <CarouselItem key={index} className={'border-0'}>
                          <div className={'relative'}>
                            {imageList.length == 1 && (
                              <div className={'layer absolute t-0 l-0 w-full h-full'}></div>
                            )}
                            <Card className={'p-2 shadow-none border-0'}>
                              <CardContent className="flex aspect-square items-center justify-center p-0">
                                <div className={'w-full h-full rounded-lg overflow-hidden'}>
                                  <img
                                    src={src}
                                    alt="img"
                                    className={'w-full h-full object-cover'}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
                <CardContent className={'p-2'}>
                  <h3 className="scroll-m-20 text-lg tracking-tight line-clamp-2 min-h-[56px] pb-1">
                    {title}
                  </h3>
                  <div className="text-sm font-semibold line-clamp-2">
                    {formatNumberWithCommas(price)}원
                  </div>
                </CardContent>
                <CardFooter className={'p-2'}>
                  <Button variant={'secondary'} className={'w-full'} asChild>
                    <Link to={`/product/${id}`}>장바구니 담기</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
