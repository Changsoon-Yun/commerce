declare namespace Cypress {
  interface Chainable {
    signInWithEmailAndPassword(type: 'seller' | 'customer'): void;
    signOut(): void;
    sortAndVerify(
      sortOption: '최신순' | '오래된순' | '높은 가격순' | '낮은 가격순',
      sortingCriteria: 'product-price' | 'product-date',
      compareFunction: ((a: string, b: string) => number) | undefined
    ): void;
    addCart(): void;
  }
}
