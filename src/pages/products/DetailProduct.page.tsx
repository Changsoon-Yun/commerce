import { Link, useParams } from 'react-router-dom';
import useGetProduct from '@/apis/useGetProduct.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';
import { Button } from '@/components/ui/button.tsx';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import ProductCard from '@/components/products/ProductCard.tsx';
import { useAuth } from '@/apis/useAuth.ts';
import * as dayjs from 'dayjs';
import { Separator } from '@/components/ui/separator.tsx';
import useGetRelatedProducts from '@/apis/useGetRelatedProducts.ts';
import { IProducts } from '@/apis/types/product';

export default function DetailProductPage() {
  const { id } = useParams();
  const { storedUserData } = useAuth();

  const { product } = useGetProduct({ id });
  const { products: recommendedProducts } = useGetRelatedProducts(
    product?.category as string,
    id as string
  );
  const { carts, addCart, removeCart } = useContext(CartContext);

  const handleCartButtonClick = (id: string) => {
    if (storedUserData) {
      if (carts.includes(id)) {
        removeCart(id);
      } else {
        addCart(id);
      }
    } else {
      alert('로그인한 유저만 가능합니다');
    }
  };
  if (!product || !id) {
    return;
  }

  return (
    <>
      <div className={'pt-10 pr-10'}>
        <div className={'flex gap-4'}>
          <Carousel className="w-full max-w-xs mx-16">
            <CarouselContent>
              {product.imageList.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className={'overflow-hidden'}>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img src={src} alt="img" className={'w-full h-full object-cover'} />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className={'flex-1'}>
            <div className="mb-4">
              <h2 className={'text-2xl font-semibold'}>{product.title}</h2>
            </div>
            <div className="mb-4">
              <h2 className={'text-3xl font-semibold'}>
                {formatNumberWithCommas(product.price)}
                <span className={'text-2xl font-medium'}> 원</span>
              </h2>
            </div>
            <Separator className={'mb-4'} />
            <div className="flex gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>등록일</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {dayjs(getDateFromProduct(product.createdAt)).format('YYYY년 MM월 DD일')}
              </span>
            </div>

            <div className="flex gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 상태</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {convertLabelByValue(product.condition, conditions)}
              </span>
            </div>
            <div className="flex gap-2 mb-8 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 정보</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>{product.desc}</span>
            </div>
            <div className={'flex gap-2'}>
              <Button
                className={'flex-1'}
                onClick={() => {
                  handleCartButtonClick(id);
                }}>
                {storedUserData && carts.includes(id) ? '찜취소' : '찜하기'}
              </Button>
              <Button className={'flex-1'} asChild>
                <Link to={`/order/${id}`}>구매하기</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className={'pt-16 pb-8 text-zinc-800 text-2xl font-semibold'}>연관 상품</div>
        <div className={'flex gap-2 justify-start'}>
          <ProductCard targetArr={recommendedProducts as IProducts[]} />
        </div>
      </div>
    </>
  );
}
