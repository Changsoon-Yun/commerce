import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { IProducts } from '@/apis/types/product';

export default function useGetRelatedProducts(category: string, id: string) {
  const fetchData = async () => {
    // 모든 상품을 가져오는 쿼리
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      where('id', '!=', id),
      limit(4)
    );

    const querySnapshot = await getDocs(q);

    const products: IProducts[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as IProducts);
    });

    return products;
  };

  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.RELATED(category, id),
    queryFn: fetchData,
    enabled: !!category,
  });

  return { products };
}
