import { getDoc } from 'firebase/firestore';
import { createDocRef, db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { useCallback, useMemo } from 'react';
import { Product } from '@/types/product.ts';

export default function useGetProduct(id: string) {
  const fetchData = useCallback(async () => {
    const productDocRef = createDocRef<Product>(db, `products/${id}`);
    const querySnapshot = await getDoc(productDocRef);
    return querySnapshot.data();
  }, [id]);

  const { data: product } = useQuery({
    queryKey: useMemo(() => QUERY_KEYS.PRODUCT.DETAIL(id), [id]),
    queryFn: fetchData,
    // id가 cart가 아닐때 &&  id가 있을때만 fetching
    enabled: id !== 'cart' && !!id,
  });
  return { product };
}
