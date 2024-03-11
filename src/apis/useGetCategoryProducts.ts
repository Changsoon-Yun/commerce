import { db } from '@/lib/firebase/firebase';
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
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useMemo } from 'react';
import { QUERY_KEYS } from '@/lib/react-query/queryKeys.ts';
import { Product } from '@/types/product.ts';
import { PAGE_LIMIT } from '@/constant/pageLimit.ts';

export interface FilterOptions {
  option: 'updatedAt' | 'price';
  direction: 'desc' | 'asc';
}
interface Options {
  category: string;
  filter: FilterOptions;
}

export default function useGetCategoryProducts({ category, filter }: Options) {
  const fetchData = useCallback(
    async (lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined) => {
      const q = !lastVisible
        ? query(
            collection(db, `products`),
            where('category', '==', category),
            orderBy(filter.option, filter.direction),
            limit(PAGE_LIMIT)
          )
        : query(
            collection(db, `products`),
            where('category', '==', category),
            orderBy(filter.option, filter.direction),
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
    [category, filter]
  );

  const queryKey = useMemo(
    () => QUERY_KEYS.PRODUCTS.CATEGORY(category, filter),
    [category, filter]
  );

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey,
    initialPageParam: undefined,
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
    }) => fetchData(pageParam),
    enabled: !!category,
    getNextPageParam: (lastPage) => {
      const lastVisible = lastPage.querySnapshot.docs[lastPage.querySnapshot.docs.length - 1];
      return lastPage.querySnapshot.size >= PAGE_LIMIT ? lastVisible : undefined;
    },
  });

  const [inViewRef, inView] = useInView({});

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return { products, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, inViewRef };
}
