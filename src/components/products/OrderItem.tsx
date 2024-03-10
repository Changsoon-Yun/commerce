import {
  convertLabelByValue,
  formatNumberWithCommas,
  getDateFromProduct,
} from '@/utils/converter.ts';
import { Separator } from '@/components/ui/separator.tsx';
import dayjs from 'dayjs';
import { conditions } from '@/constant/conditions.ts';
import { Product } from '@/types/product.ts';
import DetailDescription from '@/components/products/detail/DetailDescription.tsx';
import { Card } from '@/components/compound/card';

interface OrderItemProps {
  item: Product;
  handleSingleCheck: (checked: boolean, item: Product) => void;
  checkItems: Product[];
}

export default function OrderItem({ item, handleSingleCheck, checkItems }: OrderItemProps) {
  return (
    <>
      <div className={'flex gap-2 p-4 border border-t-0 border-zinc-300 bg-white'} key={item.id}>
        <input
          type={'checkbox'}
          onChange={(e) => {
            handleSingleCheck(e.target.checked, item);
          }}
          checked={checkItems.includes(item)}
        />
        <div className={'flex-1'}>
          <Card.Root>
            <Card.Img imageList={item.imageList} />
            <Card.Title title={item.title} />
            <Card.Description
              text={
                <>
                  {formatNumberWithCommas(item.price)}
                  <span className={'text- font-medium'}> 원</span>
                </>
              }
            />
            <Card.Description
              text={
                <DetailDescription
                  title={'등록일'}
                  data-testid={'product-date'}
                  content={dayjs(getDateFromProduct(item.createdAt)).format('YYYY년 MM월 DD일')}
                />
              }
            />
            <Card.Description
              text={
                <DetailDescription
                  data-testid={'product-condition'}
                  title={'상품 상태'}
                  content={convertLabelByValue(item.condition, conditions) as string}
                />
              }
            />
            <Card.Description
              text={
                <DetailDescription
                  data-testid={'product-desc'}
                  title={'상품 정보'}
                  content={item.desc}
                />
              }
            />
          </Card.Root>
          <Separator className={'mb-2'} />
        </div>
      </div>
    </>
  );
}
