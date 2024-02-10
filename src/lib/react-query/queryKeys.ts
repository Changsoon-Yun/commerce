import { FilterOptions } from '@/apis/useGetCategoryProducts.ts';

export const QUERY_KEYS = {
  AUTH: {
    BASE: ['userInfo'] as const,
    USER: () => [QUERY_KEYS.AUTH.BASE[0]] as const,
  },
  PRODUCTS: {
    BASE: ['products'] as const,
    HOME: (category: string) => [QUERY_KEYS.PRODUCTS.BASE[0], 'home', category] as const,
    SELLER: (uid: string) => [QUERY_KEYS.PRODUCTS.BASE[0], uid] as const,
    CATEGORY: (category: string, filter: FilterOptions) =>
      [QUERY_KEYS.PRODUCTS.BASE[0], category, filter] as const,
    RELATED: (category: string, id: string) => [QUERY_KEYS.PRODUCTS.BASE[0], category, id] as const,
    CART: () => [QUERY_KEYS.PRODUCTS.BASE[0], 'CART'],
  },
  PRODUCT: {
    BASE: ['product'] as const,
    SELLER: (uid: string, id: string) => [QUERY_KEYS.PRODUCT.BASE[0], uid, id] as const,
    DETAIL: (id: string) => [QUERY_KEYS.PRODUCT.BASE[0], id],
  },
};
