function generateRandomEmail() {
  const emailPrefix = 'testuser';
  const domain = 'example.com';
  const randomNum = Math.floor(Math.random() * 10000);
  const timestamp = new Date().getTime();

  return `${emailPrefix}${randomNum}_${timestamp}@${domain}`;
}

describe('회원가입 테스트', () => {
  beforeEach(() => {
    cy.visit('/register/seller');

    cy.get('input[name="email"]').as('email-input').should('exist');
    cy.get('input[name="userName"]').as('userName-input').should('exist');
    cy.get('input[name="password"]').as('password-input').should('exist');
    cy.get('[data-testid="register-button"]').as('register-button').should('exist');
  });
  it('회원가입 테스트', () => {
    const randomEmail = generateRandomEmail();

    cy.get('@email-input').type(randomEmail);
    cy.get('@userName-input').type(randomEmail);
    cy.get('@password-input').type('1q2w3e4r!A');

    cy.get('@email-input').invoke('val').should('eq', randomEmail);
    cy.get('@userName-input').invoke('val').should('eq', randomEmail);
    cy.get('@password-input').invoke('val').should('eq', '1q2w3e4r!A');
    cy.get('@register-button').click();

    cy.get('li[role="status"]').should(
      'have.text',
      '회원 가입 성공!로그인까지 했어요! 메인 페이지로 이동합니다!'
    );
    cy.url().should('eq', 'http://localhost:5173/');
  });

  context('잘못된 인풋 입력', () => {
    it('이메일 에러 메세지 출력', () => {
      cy.get('@email-input').type('a');
      cy.get('@register-button').click();
      cy.get('[data-testid="email-error-msg"]').should('have.text', '이메일 형식에 맞지 않습니다.');
    });

    it('이름 에러 메세지 출력', () => {
      const randomEmail = generateRandomEmail();
      cy.get('@email-input').type(randomEmail);
      cy.get('[data-testid="email-error-msg"]').should('not.exist');

      cy.get('@password-input').type('1q2w3e4r!A');
      cy.get('@register-button').click();
      cy.get('[data-testid="userName-error-msg"]').should('have.text', '이름을 입력해 주세요.');
    });

    it('비밀번호 에러 메세지 출력', () => {
      const randomEmail = generateRandomEmail();
      cy.get('@email-input').type(randomEmail);
      cy.get('[data-testid="email-error-msg"]').should('not.exist');

      cy.get('@userName-input').type(randomEmail);
      cy.get('[data-testid="userName-error-msg"]').should('not.exist');

      cy.get('@password-input').type('1q');
      cy.get('@register-button').click();
      cy.get('[data-testid="password-error-msg"]').should(
        'have.text',
        '비밀번호 형식에 맞지 않습니다.'
      );
    });
  });
});
