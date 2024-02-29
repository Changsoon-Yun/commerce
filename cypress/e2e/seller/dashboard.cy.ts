describe('판매자 상품 확인', () => {
  beforeEach(() => {
    cy.signInWithEmailAndPassword('seller');
    cy.visit('/seller/dashboard');
  });

  it('상품 무한스크롤 확인', () => {
    cy.get('[data-testid="seller-product"]').should('be.visible');

    cy.get('[data-testid="seller-products-wrapper"]').scrollIntoView({
      duration: 1000,
      offset: { top: 100000, left: 0 },
    });

    cy.get('[data-testid="seller-product"]').should('have.length.greaterThan', 4);
  });
});
