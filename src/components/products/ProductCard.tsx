import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { formatNumberWithCommas, getDateFromProduct } from '@/utils/converter.ts';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { IProducts } from '@/types/product.ts';

export default function ProductCard({ targetArr }: { targetArr: IProducts[] }) {
  return (
    <>
      {targetArr?.map(({ title, imageList, id, price, updatedAt }) => (
        <Card className={'flex-1 cursor-pointer'} key={id} data-cy={'product-card'}>
          <Link to={`/product/${id}`}>
            <Carousel className="w-full max-w-xs" opts={{ active: imageList.length > 1 }}>
              <CarouselContent>
                {imageList.map((src: string, index: number) => (
                  <CarouselItem key={index} className={'border-0'}>
                    <div className={'relative'}>
                      {imageList.length == 1 && (
                        <div className={'layer absolute t-0 l-0 w-full h-full'}></div>
                      )}
                      <Card className={'p-2 shadow-none border-0'}>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <div className={'w-full h-full rounded-lg overflow-hidden'}>
                            <img
                              data-cy={'product-img'}
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
            <CardContent className={'p-2'}>
              <h3
                data-cy={'product-title'}
                className="scroll-m-20 text-lg tracking-tight line-clamp-2 min-h-[56px] pb-1">
                {title}
              </h3>
              <div data-cy={'product-price'} className="text-sm font-semibold line-clamp-2">
                {formatNumberWithCommas(price)}원
              </div>
              <p className={'hidden'} data-cy={'product-date'}>
                {getDateFromProduct(updatedAt)}
              </p>
            </CardContent>
            <CardFooter className={'p-2'}>
              <Button data-cy={'product-detail-link'} variant={'secondary'} className={'w-full'}>
                상세보기
              </Button>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </>
  );
}
