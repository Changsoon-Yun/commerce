import { Link, useParams } from 'react-router-dom';
import useGetProduct from '@/apis/useGetProduct.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { convertLabelByValue, formatNumberWithCommas } from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';
import * as dayjs from 'dayjs';
import { Button } from '@/components/ui/button.tsx';
import useGetHomeProducts from '@/apis/useGetHomeProducts.ts';

export default function DetailProductPage() {
  const { id } = useParams();
  const { product } = useGetProduct({ id });
  const { products: recommendedProducts } = useGetHomeProducts(product?.category as string);
  if (!product) {
    return;
  }

  const date = (product.createdAt.seconds + product.createdAt.nanoseconds / 1000000000) * 1000;

  return (
    <>
      <div className={'pt-10 pr-10'}>
        <div className={'flex gap-4'}>
          <div className={'px-16'}>
            <Carousel className="w-full max-w-xs">
              <CarouselContent className={'p-0'}>
                {product.imageList.map((src: string) => (
                  <CarouselItem key={src} className={'p-0'}>
                    <div className="p-0">
                      <Card className={'p-0'}>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <img src={src} alt="img" className={'w-full h-full'} />
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
          <div>
            <div>업로드 날짜 : {dayjs(date).format('YYYY년 MM월 DD일')}</div>
            <div>제목 : {product.title}</div>
            <div>가격 : {product.price}</div>
            <div>상태 : {convertLabelByValue(product.condition, conditions)}</div>
            <div>설명 : {product.desc}</div>
            <div>
              <Button>찜하기</Button>
            </div>
          </div>
        </div>
        <div>아래는 추천상품 입니다.</div>
        <div className={'flex gap-2 justify-between'}>
          {recommendedProducts?.map(({ title, imageList, id, price }) => (
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
                                <img src={src} alt="img" className={'w-full h-full object-cover'} />
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
    </>
  );
}
