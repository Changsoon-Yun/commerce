import { getDoc } from 'firebase/firestore';
import { createDocRef, db } from '@/lib/firebase/firebase.ts';
import { Product } from '@/types/product.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { useMemo } from 'react';
import { queryClient } from '@/lib/react-query/queryClient.ts';

export default function useGetCartProducts(carts: string[]) {
  const fetchDataById = async (id: string) => {
    const productRef = createDocRef<Product>(db, `products/${id}`);
    const querySnapshot = await getDoc(productRef);
    return querySnapshot.data();
  };

  const fetchProductsByIds = useMemo(
    () => async (carts: string[]) => {
      if (carts.length === 0) return;
      const promises = carts.map((id: string) => fetchDataById(id) as Promise<Product>);
      return Promise.all(promises);
    },
    []
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
