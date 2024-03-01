describe('회원가입 테스트', () => {
  it('회원가입 페이지로 이동 되는지', () => {
    cy.visit('/login');

    cy.get('[data-testid="link-to-register"]').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:5173/register/seller');
  });
  it('회원가입 테스트', () => {});
});
