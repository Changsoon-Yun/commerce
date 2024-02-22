import { user } from '../../fixtures/user.ts';

describe('로그인 테스트', () => {
  const { seller } = user;

  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-testid="heading-text"]').should('have.text', '로그인');

    cy.get('input[name="email"]').as('email-input').should('exist');
    cy.get('input[name="password"]').as('password-input').should('exist');
    cy.get('[data-testid="login-button"]').as('login-button').should('exist');
  });
  it('정상적인 로그인 시도', () => {
    cy.get('@email-input').type(seller.email);
    cy.get('@email-input').invoke('val').should('eq', seller.email);

    cy.get('@password-input').type(seller.password);
    cy.get('@password-input').invoke('val').should('eq', seller.password);

    cy.get('@login-button').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  context('잘못된 인풋 입력', () => {
    it('이메일 에러 메세지 출력', () => {
      cy.get('@email-input').type('a');
      cy.get('@login-button').click();
      cy.get('[data-testid="email-error-msg"]').should('have.text', '이메일 형식에 맞지 않습니다.');
    });

    it('비밀번호 에러 메세지 출력', () => {
      cy.get('@email-input').type(seller.email);
      cy.get('[data-testid="email-error-msg"]').should('not.exist');

      cy.get('@password-input').type('1q');
      cy.get('@login-button').click();
      cy.get('[data-testid="password-error-msg"]').should(
        'have.text',
        '비밀번호 형식에 맞지 않습니다.'
      );
    });
  });

  afterEach(() => {
    cy.signOut();
  });
});
