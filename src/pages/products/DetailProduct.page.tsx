import { useParams } from 'react-router-dom';
import useGetProduct from '@/apis/useGetProduct.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { convertLabelByValue } from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';
import * as dayjs from 'dayjs';
import { Button } from '@/components/ui/button.tsx';
import useGetHomeProducts from '@/apis/useGetHomeProducts.ts';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import ProductCard from '@/components/products/ProductCard.tsx';
import { IProducts } from '@/apis/useGetSellerProducts.ts';

export default function DetailProductPage() {
  const { id } = useParams();
  const { product } = useGetProduct({ id });
  const { products: recommendedProducts } = useGetHomeProducts(product?.category as string);
  const { carts, addCart, removeCart } = useContext(CartContext);
  if (!product || !id) {
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
            <div>가격 : {id}</div>
            <div>상태 : {convertLabelByValue(product.condition, conditions)}</div>
            <div>설명 : {product.desc}</div>
            <div>
              {carts.includes(id) ? (
                <Button
                  onClick={() => {
                    removeCart(id);
                  }}>
                  찜취소
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    addCart(id);
                  }}>
                  찜하기
                </Button>
              )}
            </div>
          </div>
        </div>
        <div>아래는 추천상품 입니다.</div>
        <div className={'flex gap-2 justify-between'}>
          <ProductCard targetArr={recommendedProducts as IProducts[]} />
        </div>
      </div>
    </>
  );
}
