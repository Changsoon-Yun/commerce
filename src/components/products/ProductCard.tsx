import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { formatNumberWithCommas } from '@/utils/converter.ts';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { IProducts } from '@/apis/useGetSellerProducts.ts';

export default function ProductCard({ targetArr }: { targetArr: IProducts[] }) {
  return (
    <>
      {targetArr?.map(({ title, imageList, id, price }) => (
        <Card className={'flex-1'} key={id}>
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
                          <img src={src} alt="img" className={'w-full h-full object-cover'} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
    </>
  );
}
