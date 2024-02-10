import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { IProducts } from '@/apis/useGetSellerProducts.ts';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';

export default function useGetCartProducts(carts: string[]) {
  const fetchDataById = async (id: string) => {
    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data() as IProducts;
  };
  const fetchProductsByIds = async (carts: string[]) => {
    const promises = carts.map((id: string) => fetchDataById(id));
    const res = await Promise.all(promises);
    console.log(res);
    return res;
  };

  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.CART(),
    queryFn: () => fetchProductsByIds(carts),
    // id가 있을때만 fetching
    enabled: !!carts,
  });
  return { products };
}
