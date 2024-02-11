import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { IProducts } from '@/apis/useGetSellerProducts.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { queryClient } from '@/App.tsx';

export default function useGetCartProducts(carts: string[]) {
  const fetchDataById = async (id: string) => {
    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data() as IProducts;
  };
  const fetchProductsByIds = async (carts: string[]) => {
    const promises = carts.map((id: string) => fetchDataById(id));
    return await Promise.all(promises);
  };

  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.CART(),
    queryFn: () => fetchProductsByIds(carts),
    // id가 있을때만 fetching
    enabled: !!carts,
  });

  const { mutate } = useMutation({
    mutationFn: () => fetchProductsByIds(carts),
    onSuccess(data) {
      queryClient.setQueryData(QUERY_KEYS.PRODUCTS.CART(), data);
    },
  });
  return { products, mutate };
}
