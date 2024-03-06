import { useAuth } from '@/apis/auth/useAuth.ts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { useCallback, useMemo } from 'react';
import { IProducts } from '@/types/product.ts';

export default function useGetSellerProduct({ id }: { id: string }) {
  const { storedUserData } = useAuth();

  const fetchData = useCallback(async () => {
    if (!id || !storedUserData?.uid) return null; // id나 storedUserData가 없으면 fetchData 실행하지 않음

    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data() as IProducts;
  }, [id, storedUserData]);

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
