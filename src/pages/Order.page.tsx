import { Button } from '@/components/ui/button.tsx';
import useOrder from '@/hooks/useOrder.ts';
import useGetCartProducts from '@/apis/useGetCartProducts.ts';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext.tsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { convertLabelByValue, formatNumberWithCommas } from '@/utils/converter.ts';
import { conditions } from '@/constant/conditions.ts';

export default function OrderPage() {
  const { onClickPayment } = useOrder();
  const { carts } = useContext(CartContext);
  const { products } = useGetCartProducts(carts);

  console.log(products);
  return (
    <>
      <div>주문 목록</div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[150px]">대표이미지</TableHead>
            <TableHead className={'min-w-[150px]'}>제목</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="w-[150px] text-right">가격</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                <div key={item.id}>
                  <img src={item.imageList[0]} alt="img" />
                </div>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{convertLabelByValue(item.condition, conditions)}</TableCell>
              <TableCell className={'font-semibold text-right'}>
                {formatNumberWithCommas(item.price)}원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>총 가격</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button onClick={onClickPayment}>결제하기</Button>
    </>
  );
}
