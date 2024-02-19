describe('카테고리 상품 페이지', () => {
  beforeEach(() => {
    cy.visit('/products/clothing_fashion');
  });
  it('최신순 정렬이 되는지', () => {
    cy.sortAndVerify('최신순', 'product-date', (a, b) => +b - +a);
  });

  it('오래된순 정렬이 되는지', () => {
    cy.sortAndVerify('오래된순', 'product-date', (a, b) => +a - +b);
  });

  it('높은 가격순 정렬이 되는지', () => {
    cy.sortAndVerify('높은 가격순', 'product-price', (a, b) => +b - +a);
  });

  it('낮은 가격순 정렬이 되는지', () => {
    cy.sortAndVerify('낮은 가격순', 'product-price', (a, b) => +a - +b);
  });
});
