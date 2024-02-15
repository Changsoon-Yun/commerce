import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import { Separator } from '@/components/ui/separator.tsx';
import dayjs from 'dayjs';
import { conditions } from '@/constant/conditions.ts';
import { IProducts, OrderStatus } from '@/types/product.ts';
import { Button } from '@/components/ui/button.tsx';

interface OrderedListItemProps {
  product: IProducts;
  cancelOrderById: (id: string) => Promise<void>;
}

export default function OrderedListItem({ product, cancelOrderById }: OrderedListItemProps) {
  return (
    <>
      <div
        className={'pt-10 pr-10 p-4 border border-t-0 first:border-t-[1px] border-zinc-300'}
        key={product.id}>
        <div className={'flex gap-4'}>
          <img
            src={product.imageList[0]}
            alt="img"
            className={'w-[200px] h-[200px] object-cover'}
          />
          <div className={'flex-1'}>
            <div className="mb-2">
              <h2 className={'text-md font-semibold line-clamp-2'}>{product.title}</h2>
            </div>
            <div className="mb-2">
              <h2 className={'text-xl font-semibold'}>
                {formatNumberWithCommas(product.price)}
                <span className={'text-2xl font-medium'}> 원</span>
              </h2>
            </div>
            <Separator className={'mb-2'} />
            <div className="flex gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>등록일</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {dayjs(getDateFromProduct(product.createdAt)).format('YYYY년 MM월 DD일')}
              </span>
            </div>

            <div className="flex gap-2 mb-2 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 상태</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {convertLabelByValue(product.condition, conditions)}
              </span>
            </div>
            <div className="flex gap-2 mb-2 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 정보</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold line-clamp-2'}>{product.desc}</span>
            </div>
          </div>
          <div className={'flex flex-col min-w-[300px] border-l border-zinc-200 pl-4'}>
            <div className="flex gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>구매일</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {dayjs(getDateFromProduct(product.orderedDate)).format('YYYY-MM-DD')}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>판매자</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>{product.sellerEmail ?? ''}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>주문 상태</span>
              <span>:</span>
              <span className={'text-zinc-600 text-lg font-bold'}>{product.orderStatus}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-2 mb-4 text-sm">
              <Button variant={'outline'} className={'w-full'}>
                배송 조회
              </Button>
              {product.orderStatus !== OrderStatus.SALE_COMPLETED && (
                <Button
                  variant={'outline'}
                  className={'w-full'}
                  onClick={() => {
                    cancelOrderById(product.id);
                  }}>
                  주문 취소
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
