import { useAuth } from '@/apis/useAuth.ts';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { IProducts } from '@/types/product.ts';

export default function useGetOrderedProducts() {
  const { storedUserData } = useAuth();

  const fetchData = async () => {
    const q = query(collection(db, 'products'), where('isSold', '==', true));
    const querySnapshot = await getDocs(q);

    const products: IProducts[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as IProducts);
    });

    return products.filter((product) => {
      return product.customerData.uid === storedUserData?.uid && product;
    });
  };

  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.ORDERED(),
    queryFn: fetchData,
  });
  return { products };
}
