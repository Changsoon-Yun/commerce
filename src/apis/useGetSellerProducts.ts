import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/apis/useAuth.ts';
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';

interface TimeStamp {
  nanoseconds: number;
  seconds: number;
}

interface IProducts extends DocumentData {
  title: string;
  id: string;
  desc: string;
  imageList: string[];
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  uid: string;
}

export default function useGetSellerProducts() {
  const { storedUserData } = useAuth();

  const fetchData = async () => {
    const q = query(collection(db, `products/${storedUserData?.uid}/products`));
    const querySnapshot = await getDocs(q);
    const products: IProducts[] = [];
    querySnapshot.forEach((doc) => {
      products.push(<IProducts>{ id: doc.id, ...doc.data() });
    });

    return products;
  };

  const { data: products } = useQuery({
    queryKey: [`products/${storedUserData?.uid}`],
    queryFn: fetchData,
  });
  return { products };
}
