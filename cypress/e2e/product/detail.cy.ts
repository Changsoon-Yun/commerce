describe('디테일 페이지', () => {
  it('상품 설명', () => {
    cy.visit('/');
    cy.get('[data-cy="category-product-list"]')
      .first()
      .find('[data-cy="product-card"]')
      .first()
      .click();

    cy.get('[data-cy="product-img"]').should('be.visible');
    cy.get('[data-cy="product-title"]').should('be.visible');
    cy.get('[data-cy="product-date"]').should('be.visible');
    cy.get('[data-cy="product-condition"]').should('be.visible');
    cy.get('[data-cy="product-desc"]').should('be.visible');

    cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
    cy.get('[data-cy="product-card"]').should('have.length.below', 5);
  });
});
