import { useAuth } from '@/apis/useAuth.ts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useQuery } from '@tanstack/react-query';

export default function useGetSellerProduct({ id }: { id: string }) {
  const { storedUserData } = useAuth();

  const fetchData = async () => {
    const q = doc(db, `products/${storedUserData?.uid}/products`, id);
    const querySnapshot = await getDoc(q);

    return querySnapshot.data();
  };

  const { data: product } = useQuery({
    queryKey: [`products/${storedUserData?.uid}/${id}`],
    queryFn: fetchData,
  });
  return { product };
}
