import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';

export interface FilterOptions {
  option: 'updatedAt' | 'price';
  direction: 'desc' | 'asc';
}
interface Options {
  category: string;
  filter: FilterOptions;
}
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
export default function useGetCategoryProducts({ category, filter }: Options) {
  const fetchData = async () => {
    // 모든 상품을 가져오는 쿼리
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy(filter.option, filter.direction)
    );
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  };

  const { data: products } = useQuery({
    queryKey: [`products`, category, filter],
    queryFn: fetchData,
    enabled: !!category,
  });

  return { products };
}
