import { db } from '@/lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  imageList: string[];
  uid: string;
  title: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  desc: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
export default function useGetProducts() {
  const fetchData = async () => {
    // 모든 상품을 가져오는 쿼리
    const q = collection(db, `products`);
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  };

  const { data: products } = useQuery({
    queryKey: [`products/all`],
    queryFn: fetchData,
  });

  return { products };
}
