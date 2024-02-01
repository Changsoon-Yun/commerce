import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.tsx';
import useGetProducts from '@/apis/useGetProducts';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { formatNumberWithCommas } from '@/utils/converter.ts';

interface CardWithCategoryProps {
  category: { label: string; value: string };
}
export default function CardWithCategory({ category }: CardWithCategoryProps) {
  const { products } = useGetProducts(category.value);
  console.log(products);
  return (
    <>
      <div key={category.value}>
        <div className={'pb-8'}>
          <div className={'flex justify-between items-center'}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-4">
              {category.label}
            </h3>
            <small className="text-sm font-medium leading-none text-zinc-400">
              <Link to={`products/${category.value}`}>더보기</Link>
            </small>
          </div>
          <div className={'flex gap-2'}>
            {products?.map(({ title, imageList, price, createdAt }) => (
              <Card className="flex-1 max-w-[240px] overflow-hidden" key={createdAt.seconds}>
                <div>
                  <Carousel className="w-full max-w-xs" opts={{ active: imageList.length > 1 }}>
                    <CarouselContent className={''}>
                      {imageList.map((src, index) => (
                        <CarouselItem key={index} className={'border-0'}>
                          <div className={'relative'}>
                            {imageList.length == 1 && (
                              <div className={'absolute t-0 l-0 w-full h-full'}></div>
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
