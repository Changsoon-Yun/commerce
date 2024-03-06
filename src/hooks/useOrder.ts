import { RequestPayParams, RequestPayResponse } from '@/types/imp.ts';
import { useContext, useState } from 'react';
import useGetCartProducts from '@/apis/useGetCartProducts.ts';
import { CartContext } from '@/context/CartContext.tsx';
import { z } from 'zod';
import { orderDataFormSchema } from '@/lib/zod/schemas.ts';
import { useAuth } from '@/apis/auth/useAuth.ts';
import { IProducts } from '@/types/product.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { queryClient } from '@/lib/react-query/queryClient.ts';
import { handleFirebaseError } from '@/utils/handleFirebaseError';
import { cancelOrderByIdAction, updateFetchAction } from '@/lib/firebase/productActions.ts';

export default function useOrder() {
  const { carts } = useContext(CartContext);
  const { products } = useGetCartProducts(carts);
  const { storedUserData } = useAuth();
  const onClickPayment = ({
    amount,
    name,
    buyer_name,
    buyer_tel,
    buyer_email,
    buyer_addr,
    buyer_postcode,
  }: z.infer<typeof orderDataFormSchema>) => {
    if (!window.IMP) return;
    const { IMP } = window;
    IMP.init(import.meta.env.VITE_IMP_CODE);

    const data: RequestPayParams = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount,
      name,
      buyer_name,
      buyer_tel,
      buyer_email,
      buyer_addr,
      buyer_postcode,
    };

    IMP.request_pay(data, callback);
  };

  async function callback(response: RequestPayResponse) {
    const { success, error_msg } = response;

    if (success) {
      alert('결제 성공');
    } else {
      await updateIsSoldProductsByIds(false);
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const [checkItems, setCheckItems] = useState<IProducts[]>([]);

  const handleSingleCheck = (checked: boolean, item: IProducts) => {
    if (checked) {
      setCheckItems((prev) => [...prev, item]);
    } else {
      setCheckItems(checkItems.filter((el) => el.id !== item.id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (products) {
      if (checked) {
        const idArray: IProducts[] = [];
        products.forEach((el) => idArray.push(el));
        setCheckItems(idArray);
      } else {
        setCheckItems([]);
      }
    }
  };

  const updateFetcher = async (id: string, idx: number, isSold: boolean) => {
    if (storedUserData) {
      await updateFetchAction({ id, idx, isSold, checkItems, storedUserData });
    }
  };

  const updateIsSoldProductsByIds = async (bool: boolean) => {
    const promises = checkItems.map((id, idx) => updateFetcher(id.id, idx, bool));
    return await Promise.all(promises);
  };

  const cancelOrderById = async (id: string) => {
    try {
      await cancelOrderByIdAction({ id });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ORDERED() });
      toast({
        description: '주문 취소를 성공 했습니다.',
      });
    } catch (e) {
      handleFirebaseError({ e, toast });
    }
  };

  return {
    onClickPayment,
    products,
    checkItems,
    setCheckItems,
    handleSingleCheck,
    handleAllCheck,
    updateIsSoldProductsByIds,
    cancelOrderById,
  };
}
