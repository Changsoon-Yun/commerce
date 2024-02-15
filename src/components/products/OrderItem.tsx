import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import { Separator } from '@/components/ui/separator.tsx';
import dayjs from 'dayjs';
import { conditions } from '@/constant/conditions.ts';
import { IProducts } from '@/types/product.ts';

interface OrderItemProps {
  item: IProducts;
  handleSingleCheck: (checked: boolean, item: IProducts) => void;
  checkItems: IProducts[];
}

export default function OrderItem({ item, handleSingleCheck, checkItems }: OrderItemProps) {
  return (
    <>
      <div className={'pt-10 pr-10 p-4 border border-t-0 border-zinc-300'} key={item.id}>
        <div className={'flex gap-4'}>
          <input
            type={'checkbox'}
            onChange={(e) => {
              handleSingleCheck(e.target.checked, item);
            }}
            checked={checkItems.includes(item)}
          />
          <img src={item.imageList[0]} alt="img" className={'w-[200px] h-[200px] object-cover'} />
          <div className={'flex-1'}>
            <div className="mb-2">
              <h2 className={'text-md font-semibold line-clamp-2'}>{item.title}</h2>
            </div>
            <div className="mb-2">
              <h2 className={'text-xl font-semibold'}>
                {formatNumberWithCommas(item.price)}
                <span className={'text-2xl font-medium'}> 원</span>
              </h2>
            </div>
            <Separator className={'mb-2'} />
            <div className="flex gap-2 mb-4 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>등록일</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {dayjs(getDateFromProduct(item.createdAt)).format('YYYY년 MM월 DD일')}
              </span>
            </div>

            <div className="flex gap-2 mb-2 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 상태</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold'}>
                {convertLabelByValue(item.condition, conditions)}
              </span>
            </div>
            <div className="flex gap-2 mb-2 text-sm">
              <span className={'text-zinc-400 min-w-[70px]'}>상품 정보</span>
              <span>:</span>
              <span className={'text-zinc-600 font-semibold line-clamp-2'}>{item.desc}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
