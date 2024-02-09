import { Button } from '@/components/ui/button.tsx';
import useOrder from '@/hooks/useOrder.ts';

export default function OrderPage() {
  const { onClickPayment } = useOrder();

  return (
    <>
      <div>주문 목록</div>
      <div></div>
      <Button onClick={onClickPayment}>결제하기</Button>
    </>
  );
}
