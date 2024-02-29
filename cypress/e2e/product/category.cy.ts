import { PAGE_LIMIT } from '../../../src/constant/pageLimit.ts';

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

  it('무한스크롤이 되는지', () => {
    cy.get('[data-testid="product-card"]').should('be.visible');

    cy.get('[data-testid="products-wrapper"]').scrollIntoView({
      duration: 1000,
      offset: { top: 100000, left: 0 },
    });

    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', PAGE_LIMIT);
  });

  it('스켈레톤 UI가 보이는지', () => {
    cy.get('[data-testid="skeleton-card"]').should('be.visible');
  });
});
