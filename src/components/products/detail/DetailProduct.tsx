import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { IProducts } from '@/types/product.ts';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import { useAuth } from '@/apis/auth/useAuth.ts';
import dayjs from 'dayjs';
import DetailDescription from '@/components/products/detail/DetailDescription.tsx';
import DetailCarousel from '@/components/products/detail/DetailCarousel.tsx';

interface DetailProductProps {
  product: IProducts;
}

export default function DetailProduct({ product }: DetailProductProps) {
  const { carts, addCart, removeCart } = useContext(CartContext);
  const { storedUserData } = useAuth();

  const handleCartButtonClick = (id: string) => {
    if (storedUserData) {
      if (carts.includes(id)) {
        removeCart(id);
      } else {
        addCart(id);
      }
    } else {
      alert('로그인한 유저만 가능합니다.');
    }
  };

  return (
    <>
      <div className={'bg-white'}>
        <DetailCarousel product={product} />
        <div className={'flex flex-col gap-4 pb-4'}>
          <h3 data-testid={'product-title'} className={'text-2xl font-semibold tracking-tight'}>
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground" data-testid={'product-desc'}>
            {product.desc}
          </p>
          <p className={'text- font-semibold'}>
            {formatNumberWithCommas(product.price)}
            <span className={'text- font-medium'}> 원</span>
          </p>
        </div>
        <div className={'pb-4'}>
          <DetailDescription
            title={'등록일'}
            data-testid={'product-date'}
            content={dayjs(getDateFromProduct(product.createdAt)).format('YYYY년 MM월 DD일')}
          />
          <DetailDescription
            data-testid={'product-condition'}
            title={'상품 상태'}
            content={convertLabelByValue(product.condition, conditions) as string}
          />
        </div>
        <div className={'flex gap-2 pb-4'}>
          <Button
            data-testid={'cart-button'}
            className={'flex-1'}
            onClick={() => {
              handleCartButtonClick(product.id);
            }}>
            {storedUserData && carts.includes(product.id) ? '찜취소' : '찜하기'}
          </Button>
          {storedUserData && (
            <Button data-testid={'buy-button'} className={'flex-1'} asChild>
              <Link to={`/order/${product.id}`}>구매하기</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
