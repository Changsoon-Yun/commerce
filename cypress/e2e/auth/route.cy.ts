import { user } from '../../fixtures/user.ts';

describe('라우팅 테스트', () => {
  const PRIVATE_ROUTES = [
    '/order/1',
    '/ordered-products',
    '/user/dashboard',
    '/user/dashboard/edit',
  ];

  const SELLER_ROUTES = ['/seller/dashboard', '/seller/product/add', '/seller/product/edit/1'];
  it('비로그인시 권한라우트에 접근 불가', () => {
    PRIVATE_ROUTES.concat(SELLER_ROUTES).forEach((route) => {
      cy.visit(route);
      cy.get('[data-cy="home"]').should('exist');
    });
  });

  context('로그인 상황', () => {
    it('소비자 로그인시 판매자 라우트에 접근 불가', () => {
      const { customer } = user;
      cy.signInWithEmailAndPassword(customer.email, customer.password);

      //권한라우트 접근가능
      PRIVATE_ROUTES.forEach((route) => {
        cy.visit(route);
        cy.get('[data-cy="home"]').should('not.exist');
      });

      //판매자 라우트 접근불가
      SELLER_ROUTES.forEach((route) => {
        cy.visit(route);
        cy.get('[data-cy="home"]').should('exist');
        cy.get('[data-cy="seller-title"]').should('not.exist');
      });
    });

    it('판매자 로그인시 권한라우트에 접근 가능', () => {
      const { seller } = user;
      cy.signInWithEmailAndPassword(seller.email, seller.password);

      SELLER_ROUTES.forEach((route) => {
        cy.visit(route);
        cy.get('[data-cy="home"]').should('not.exist');
        cy.get('[data-cy="seller-title"]').should('exist');
      });
    });

    afterEach(() => {
      cy.signOut();
    });
  });
});
