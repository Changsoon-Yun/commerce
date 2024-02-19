import { categories } from '@/constant/categories.ts';

describe('메인 랜딩 페이지', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('상품 4개 렌더링 되는지', () => {
    cy.get('[data-cy="category-product-list"]')
      .first()
      .find('[data-cy="product-card"]')
      .should('have.length.at.least', 1)
      .should('have.length.below', 5);

    cy.get('[data-cy="product-card"]').each(($product) => {
      cy.wrap($product).find('[data-cy="product-img"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-title"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-price"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-detail-link"]').should('be.visible');
    });
  });

  it('카테고리 페이지 이동 되는지', () => {
    categories.forEach(({ value }) => {
      cy.get(`[data-cy="category-link-${value}"]`).click();
      cy.url().should('include', value);
      cy.visit('/');
    });
  });
});
