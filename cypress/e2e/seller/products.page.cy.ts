describe('판매자 상품 페이지 테스트', () => {
  beforeEach(() => {
    cy.signInWithEmailAndPassword('seller');
    cy.visit('/seller/dashboard');
  });

  it('판매자가 판매하는 상품 조회 가능', () => {});
});
