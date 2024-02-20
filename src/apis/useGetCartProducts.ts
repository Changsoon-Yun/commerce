import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { IProducts } from '@/types/product.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { queryClient } from '@/lib/router/Providers.tsx';
import { useMemo } from 'react';

export default function useGetCartProducts(carts: string[]) {
  const fetchDataById = async (id: string) => {
    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);
    return querySnapshot.data() as IProducts;
  };

  const fetchProductsByIds = useMemo(
    () => async (carts: string[]) => {
      if (carts.length === 0) return [];
      const promises = carts.map((id: string) => fetchDataById(id));
      return await Promise.all(promises);
    },
    [carts]
  );

  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.CART(),
    queryFn: () => fetchProductsByIds(carts),
    // 카트에 아이템이 있을 때만 fetching
    enabled: carts.length > 0,
  });

  const { mutate } = useMutation({
    mutationFn: () => fetchProductsByIds(carts),
    onSuccess(data) {
      queryClient.setQueryData(QUERY_KEYS.PRODUCTS.CART(), data);
    },
  });
  return { products, mutate };
}
