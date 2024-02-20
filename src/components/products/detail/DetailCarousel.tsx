import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { IProducts } from '@/types/product.ts';

interface DetailCarouselProps {
  product: IProducts;
}

export default function DetailCarousel({ product }: DetailCarouselProps) {
  return (
    <>
      <div className={'flex justify-center px-8'}>
        <Carousel className="max-w-xs w-full">
          <CarouselContent>
            {product.imageList.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className={'overflow-hidden'}>
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img
                        data-cy={'product-img'}
                        src={src}
                        alt="img"
                        className={'w-full h-full object-cover'}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
