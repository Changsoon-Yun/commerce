import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import dayjs from 'dayjs';
import { conditions } from '@/constant/conditions.ts';
import { IProducts, OrderStatus } from '@/types/product.ts';
import DetailDescription from '@/components/products/detail/DetailDescription.tsx';
import DetailCarousel from '@/components/products/detail/DetailCarousel.tsx';
import CardButton from '@/components/products/card/CardButton.tsx';

interface OrderedListItemProps {
  product: IProducts;
  cancelOrderById: (id: string) => Promise<void>;
}

export default function OrderedListItem({ product, cancelOrderById }: OrderedListItemProps) {
  return (
    <>
      <div className={'p-4 border rounded-lg'} key={product.id}>
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
          <DetailDescription title={'상품 정보'} content={product.desc} />
          <DetailDescription
            title={'구매일'}
            content={dayjs(getDateFromProduct(product.orderedDate)).format('YYYY-MM-DD')}
          />
          <DetailDescription title={'판매자'} content={product.sellerEmail ?? ''} />
          <DetailDescription title={'주문 상태'} content={product.orderStatus} />
        </div>
        <div className={'flex flex-col'}>
          <div className="flex-1 flex flex-col justify-center items-center gap-2 mb-4 text-sm">
            <CardButton variant={'outline'} className={'w-full'}>
              배송 조회
            </CardButton>
            {product.orderStatus !== OrderStatus.SALE_COMPLETED && (
              <CardButton
                variant={'outline'}
                className={'w-full'}
                onClick={() => {
                  cancelOrderById(product.id);
                }}>
                주문 취소
              </CardButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
