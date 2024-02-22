import { categories } from '../../../src/constant/categories.ts';

describe('메인 랜딩 페이지', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('상품 4개 렌더링 되는지', () => {
    cy.get('[data-testid="category-product-list"]')
      .first()
      .find('[data-testid="product-card"]')
      .should('have.length.at.least', 1)
      .should('have.length.below', 5);

    cy.get('[data-testid="product-card"]').each(($product) => {
      cy.wrap($product).find('[data-testid="product-img"]').should('exist');
      cy.wrap($product).find('[data-testid="product-title"]').should('exist');
      cy.wrap($product).find('[data-testid="product-price"]').should('exist');
      cy.wrap($product).find('[data-testid="product-detail-link"]').should('exist');
    });
  });

  it('카테고리 페이지 이동 되는지', () => {
    categories.forEach(({ value }) => {
      cy.get(`[data-testid="category-link-${value}"]`).click();
      cy.url().should('include', value);
      cy.visit('/');
    });
  });
});
