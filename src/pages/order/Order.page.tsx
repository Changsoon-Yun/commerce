import { Button } from '@/components/ui/button.tsx';
import useOrder from '@/hooks/useOrder.ts';
import { formatNumberWithCommas } from '@/utils/converter.ts';
import { useParams } from 'react-router-dom';
import OrderItem from '@/components/products/OrderItem';
import useGetProduct from '@/apis/useGetProduct.ts';
import { IProducts } from '@/apis/types/product';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import FormInner from '@/components/auth/FormInner.tsx';
import { Form } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/apis/useAuth.ts';
import { orderDataFormSchema } from '@/lib/zod/schemas.ts';
import { z } from 'zod';

export default function OrderPage() {
  const { id: pathName } = useParams();
  const { storedUserData } = useAuth();
  const { product } = useGetProduct({ id: pathName });

  const {
    onClickPayment,
    products: cartProducts,
    checkItems,
    setCheckItems,
    handleSingleCheck,
    updateIsSoldProductsByIds,
  } = useOrder();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setCheckItems([product]);
    }
  }, [product]);

  useEffect(() => {
    if (pathName === 'cart') {
      if (cartProducts) {
        setCheckItems([...cartProducts]);
      }
    }
  }, [cartProducts]);

  const form = useForm({
    resolver: zodResolver(orderDataFormSchema),
    defaultValues: {
      amount: 0,
      name:
        checkItems.length > 1
          ? checkItems[0] + ' 외' + checkItems.length + ' 건'
          : checkItems[0]?.toString(),
      buyer_name: storedUserData?.userName,
      buyer_tel: '',
      buyer_email: storedUserData?.email,
      buyer_addr: '',
      buyer_postcode: '',
    },
  });

  useEffect(() => {
    form.setValue(
      'amount',
      checkItems.reduce((prev, curr) => prev + curr.price, 0)
    );
    form.setValue(
      'name',
      checkItems.length > 1
        ? checkItems[0]?.title + ' 외 ' + (checkItems.length - 1) + ' 건'
        : checkItems[0]?.title
    );
  }, [checkItems]);

  const submitHandler = async (_values: z.infer<typeof orderDataFormSchema>) => {
    console.log();
    setOpen(false);

    await updateIsSoldProductsByIds(true);
    onClickPayment(form.getValues());
  };

  return (
    <>
      <div className={'flex'}>
        <div className={'w-[800px] mr-4'}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight  border border-zinc-300 rounded-t-md  p-4">
            찜한 상품 목록
          </h4>
          {cartProducts?.map((item) => (
            <OrderItem
              item={item}
              handleSingleCheck={handleSingleCheck}
              checkItems={checkItems}
              key={item.id}
            />
          ))}
          {pathName !== 'cart' && product && (
            <>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight  border border-t-0 border-zinc-300 p-4">
                방금 보신 상품
              </h4>
              <OrderItem
                item={product as IProducts}
                handleSingleCheck={handleSingleCheck}
                checkItems={checkItems}
              />
            </>
          )}
        </div>
        <div className={'flex-1 sticky top-[100px] h-fit'}>
          <div className={'flex flex-col gap-4 border border-zinc-300 rounded-t-md p-4'}>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">주문 예상 금액</h4>
            <div>
              <div className={'flex justify-between gap-2'}>
                <p>총 상품 가격</p>
                <p>
                  {formatNumberWithCommas(checkItems.reduce((prev, curr) => prev + curr.price, 0))}{' '}
                  원
                </p>
              </div>
            </div>
            <div>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    className={'w-full'}
                    disabled={
                      formatNumberWithCommas(
                        checkItems.reduce((prev, curr) => prev + curr.price, 0)
                      ) === '0'
                    }>
                    결제하기
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>주문/결제</AlertDialogTitle>
                      </AlertDialogHeader>
                      <div>
                        <FormInner
                          form={form}
                          name={'buyer_name'}
                          label={'구매자 이름'}
                          placeholder={'차은우'}
                        />
                        <FormInner
                          form={form}
                          name={'buyer_tel'}
                          label={'구매자 전화번호'}
                          placeholder={'01012345678'}
                        />
                        <FormInner
                          form={form}
                          name={'buyer_email'}
                          label={'구매자 이메일'}
                          placeholder={'이메일을 입력해 주세요.'}
                        />
                        <FormInner
                          form={form}
                          name={'buyer_addr'}
                          label={'배송 주소'}
                          placeholder={'배송 받을 주소를 입력해 주세요.'}
                        />
                        <FormInner
                          form={form}
                          name={'buyer_postcode'}
                          label={'배송지 우편번호'}
                          placeholder={'우편번호를 입력해 주세요.'}
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <Button type={'submit'}>결제하기</Button>
                      </AlertDialogFooter>
                    </form>
                  </Form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
