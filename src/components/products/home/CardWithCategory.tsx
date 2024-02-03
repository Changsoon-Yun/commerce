import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import useGetProducts from '@/apis/useGetProducts';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { formatNumberWithCommas } from '@/utils/converter.ts';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';

interface CardWithCategoryProps {
  category: { label: string; value: string };
}
export default function CardWithCategory({ category }: CardWithCategoryProps) {
  const { products } = useGetProducts(category.value);
  return (
    <>
      <div key={category.value}>
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
            {products?.map(({ title, imageList, id, price }) => (
              <Card className="flex-1 max-w-[240px] overflow-hidden" key={id}>
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
                    <Link to={`/product/${id}`}>상세보기</Link>
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
