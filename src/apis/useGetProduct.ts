import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { IProducts } from '@/types/product.ts';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys';
import { useCallback, useMemo } from 'react';

export default function useGetProduct({ id }: { id?: string }) {
  const fetchData = useCallback(async () => {
    if (!id) return null; // id가 없으면 fetchData 실행하지 않음

    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data() as IProducts;
  }, [id]);

  const { data: product } = useQuery({
    queryKey: useMemo(() => QUERY_KEYS.PRODUCT.DETAIL(id as string), [id]),
    queryFn: fetchData,
    // id가 cart가 아닐때 &&  id가 있을때만 fetching
    enabled: id !== 'cart' && !!id,
  });
  return { product };
}
