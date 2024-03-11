import { useAuth } from '@/apis/auth/useAuth.ts';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore/lite';
import { db } from '@/lib/firebase/firebase.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { Product } from '@/types/product.ts';
import { PAGE_LIMIT } from '@/constant/pageLimit';

export default function useGetSellerProducts() {
  const { storedUserData } = useAuth();

  const fetchData = useCallback(
    async (lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined) => {
      const q = !lastVisible
        ? query(
            collection(db, `products`),
            where('uid', '==', storedUserData?.uid),
            orderBy('updatedAt', 'desc'),
            limit(PAGE_LIMIT)
          )
        : query(
            collection(db, `products`),
            where('uid', '==', storedUserData?.uid),
            orderBy('updatedAt', 'desc'),
            startAfter(lastVisible),
            limit(PAGE_LIMIT)
          );
      const querySnapshot = await getDocs(q);
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });

      return { products, querySnapshot };
    },
    [storedUserData]
  );

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: useMemo(
      () => QUERY_KEYS.PRODUCTS.SELLER(storedUserData?.uid as string),
      [storedUserData]
    ),
    initialPageParam: undefined,
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
    }) => fetchData(pageParam),
    getNextPageParam: (lastPage) => {
      const lastVisible = lastPage.querySnapshot.docs[lastPage.querySnapshot.docs.length - 1];
      if (lastPage.querySnapshot.size < PAGE_LIMIT) {
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

  return {
    products,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  };
}
