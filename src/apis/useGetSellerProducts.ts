import { useAuth } from '@/apis/useAuth.ts';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
  category: string;
  price: number;
  condition: string;
  uid: string;
}

export default function useGetSellerProducts() {
  const { storedUserData } = useAuth();

  const fetchData = async (
    lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  ) => {
    const q = !lastVisible
      ? query(collection(db, `products`), limit(10), orderBy('updatedAt', 'desc'))
      : query(
          collection(db, `products`),
          orderBy('updatedAt', 'desc'),
          startAfter(lastVisible),
          limit(10)
        );
    const querySnapshot = await getDocs(q);
    const temp: IProducts[] = [];
    querySnapshot.forEach((doc) => {
      temp.push(<IProducts>{ id: doc.id, ...doc.data() });
    });

    const products = temp.filter((product) => product.uid === storedUserData?.uid);

    return { products, querySnapshot };
  };

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`products`, storedUserData?.uid],
    initialPageParam: undefined,
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
    }) => fetchData(pageParam),
    getNextPageParam: (lastPage) => {
      const lastVisible = lastPage.querySnapshot.docs[lastPage.querySnapshot.docs.length - 1];
      if (lastPage.querySnapshot.size < 10) {
        return undefined;
      } else {
        return lastVisible;
      }
    },
  });

  const [inViewRef, inView] = useInView({});

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { products, fetchNextPage, isFetchingNextPage, hasNextPage, inViewRef };
}
