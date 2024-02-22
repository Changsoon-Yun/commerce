describe('디테일 페이지', () => {
  it('상품 설명', () => {
    cy.visit('/');
    cy.get('[data-testid="category-product-list"]')
      .first()
      .find('[data-testid="product-card"]')
      .first()
      .click();

    cy.get('[data-testid="product-img"]').should('be.visible');
    cy.get('[data-testid="product-title"]').should('be.visible');
    cy.get('[data-testid="product-date"]').should('be.visible');
    cy.get('[data-testid="product-condition"]').should('be.visible');
    cy.get('[data-testid="product-desc"]').should('be.visible');

    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
    cy.get('[data-testid="product-card"]').should('have.length.below', 5);
  });
});
