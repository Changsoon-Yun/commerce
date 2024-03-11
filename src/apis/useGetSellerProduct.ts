import { useAuth } from '@/apis/auth/useAuth.ts';
import { getDoc } from 'firebase/firestore/lite';
import { createDocRef, db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { useCallback, useMemo } from 'react';
import { Product } from '@/types/product.ts';

export default function useGetSellerProduct(id: string) {
  const { storedUserData } = useAuth();

  const fetchData = useCallback(async () => {
    const productRef = createDocRef<Product>(db, `products/${id}`);
    const querySnapshot = await getDoc(productRef);

    return querySnapshot.data();
  }, [id]);

  const { data: product } = useQuery({
    queryKey: useMemo(
      () => QUERY_KEYS.PRODUCT.SELLER(storedUserData?.uid as string, id),
      [storedUserData, id]
    ),
    queryFn: fetchData,
    // id가 있을때만 fetching
    enabled: !!id,
  });
  return { product };
}
