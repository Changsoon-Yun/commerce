import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { IProducts } from '@/types/product.ts';
import { useCallback, useMemo } from 'react';

export default function useGetHomeProducts(category: string) {
  const fetchData = useCallback(async () => {
    // 모든 상품을 가져오는 쿼리
    const q = query(collection(db, 'products'), where('category', '==', category), limit(4));
    const querySnapshot = await getDocs(q);

    const products: IProducts[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as IProducts);
    });

    return products;
  }, [category]);

  const { data: products, isLoading } = useQuery({
    queryKey: useMemo(() => QUERY_KEYS.PRODUCTS.HOME(category), [category]),
    queryFn: fetchData,
    enabled: !!category,
  });

  return { products, isLoading };
}
