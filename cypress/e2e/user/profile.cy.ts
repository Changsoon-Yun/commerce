import { toastMessage } from '../../../src/constant/toastMessage.ts';

function generateRandomNickname() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

describe('프로필 수정 테스트', () => {
  beforeEach(() => {
    cy.signInWithEmailAndPassword('seller');
  });

  context('프로필 페이지', () => {
    beforeEach(() => {
      cy.visit('/user/dashboard');
    });

    it('프로필페이지 렌더링 테스트', () => {
      cy.get('[data-testid="userName"]').should('exist');
      cy.get('[data-testid="profileImg-input"]').should('not.exist');
      cy.get('[data-testid="profile-img"]').should('be.visible');
      cy.get('[data-testid="go-edit-btn"]').should('be.visible');
      cy.get('[data-testid="submit-btn"]').should('not.exist');
    });

    it('프로필 페이지에서 수정 안됨', () => {
      cy.get('[data-testid="userName"]').should('be.disabled');
      cy.get('[data-testid="profileImg-input"]').should('not.exist');
    });
  });

  context('프로필 수정 페이지', () => {
    beforeEach(() => {
      cy.visit('/user/dashboard/edit');
    });

    it('프로필 수정 페이지 렌더링 테스트', () => {
      cy.get('[data-testid="userName"]').should('exist').should('not.be.disabled');
      cy.get('[data-testid="profileImg-input"]')
        .should('exist')
        .siblings('label')
        .should('be.visible');
    });

    it('프로필 페이지 수정 테스트', () => {
      cy.get('[data-testid="userName"]').type(generateRandomNickname());
      cy.get('[data-testid="profileImg-input"]')
        .siblings('label')
        .selectFile(['./cypress/fixtures/test-image.png', './cypress/fixtures/test-image-2.png']);
      cy.get('[data-testid="submit-btn"]').should('be.visible').click();
      cy.get('li[role="status"]').should('have.text', toastMessage.profile.description);
      cy.url().should('eq', 'http://localhost:5173/user/dashboard');
    });
  });

  afterEach(() => {
    cy.signOut();
  });
});
