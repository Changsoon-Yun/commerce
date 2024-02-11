import { Button } from '@/components/ui/button.tsx';
import useOrder from '@/hooks/useOrder.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { convertLabelByValue, formatNumberWithCommas } from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';

export default function OrderPage() {
  const { onClickPayment, products, checkItems, handleSingleCheck, handleAllCheck } = useOrder();

  return (
    <>
      <div>주문 목록</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type={'checkbox'}
                onChange={(e) => {
                  handleAllCheck(e.target.checked);
                }}
                checked={checkItems.length === products?.length}
              />
            </TableHead>
            <TableHead className="w-[150px]">대표이미지</TableHead>
            <TableHead className={'min-w-[150px]'}>제목</TableHead>
            <TableHead className="w-[150px]">상태</TableHead>
            <TableHead className="w-[150px] text-right">가격</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <input
                  type={'checkbox'}
                  onChange={(e) => {
                    // console.log(e.target);
                    handleSingleCheck(e.target.checked, item);
                  }}
                  checked={checkItems.includes(item)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div key={item.id}>
                  <img src={item.imageList[0]} alt="img" />
                </div>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{convertLabelByValue(item.condition, conditions)}</TableCell>
              <TableCell className={'text-right'}>{formatNumberWithCommas(item.price)}원</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>총 가격</TableCell>
            <TableCell className="text-right">
              {formatNumberWithCommas(checkItems.reduce((prev, curr) => prev + curr.price, 0))} 원
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button onClick={onClickPayment}>결제하기</Button>
    </>
  );
}
