import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  imageList: string[];
  uid: string;
  title: string;
  price: number;
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
export default function useGetProducts(category: string) {
  const fetchData = async () => {
    // 모든 상품을 가져오는 쿼리
    const q = query(collection(db, 'products'), where('category', '==', category), limit(4));
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  };

  const { data: products } = useQuery({
    queryKey: [`products`, category],
    queryFn: fetchData,
  });

  return { products };
}
