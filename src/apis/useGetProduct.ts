import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';
import { IProducts } from '@/apis/useGetSellerProducts.ts';

export default function useGetProduct({ id }: { id?: string }) {
  const fetchData = async () => {
    const q = doc(db, `products/${id}`);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data() as IProducts;
  };

  const { data: product } = useQuery({
    queryKey: [`product`, id],
    queryFn: fetchData,
    // id가 있을때만 fetching
    enabled: !!id,
  });
  return { product };
}
