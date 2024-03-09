import dayjs = require('dayjs');
import { toastMessage } from '../../../src/constant/toastMessage.ts';

describe('판매자 상품 CRUD 관련 테스트', () => {
  beforeEach(() => {
    cy.signInWithEmailAndPassword('seller');
    cy.visit('/seller/dashboard');
  });

  it('상품 등록', () => {
    const content = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

    cy.get('[data-testid="add-button"]').should('be.visible').click();
    cy.url().should('include', '/seller/product/add');

    cy.get('input[name="imgList"]')
      .siblings('label')
      .selectFile(['./cypress/fixtures/test-image.png', './cypress/fixtures/test-image-2.png']);

    cy.get('[data-testid="image-list"]').children().should('have.length', 2);

    cy.get('input[name="title"]').should('be.visible').type(content);
    cy.get('input[name="price"]')
      .should('be.visible')
      .type((Math.floor(Math.random() * (20000 - 100 + 1)) + 100).toString());
    cy.get('textarea[name="desc"]').should('be.visible').type(content);

    cy.get('button[role="combobox"]').as('select-trigger').should('be.visible').click();
    cy.get('[data-testid="clothing_fashion"]').should('be.visible').click();
    cy.get('@select-trigger').should('have.text', '의류 및 패션');

    cy.get('[data-testid="unopened"]').should('be.visible').click();

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/seller/dashboard');

    cy.get('li[role="status"]').should('have.text', toastMessage.productAdd.description);
  });

  it('상품 수정', () => {
    const content = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    cy.get('[data-testid="seller-product"]')
      .first()
      .find('[data-testid="edit-button"]')
      .should('exist')
      .click();

    cy.url().should('include', '/seller/product/edit');

    cy.get('input[name="title"]').should('be.visible').type(content);

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/seller/dashboard');

    cy.get('li[role="status"]').should('have.text', toastMessage.productEdit.description);
  });

  it('상품 삭제', () => {
    cy.get('[data-testid="seller-product"]').should('have.length.at.least', 1);
    cy.get('[data-testid="seller-product"]')
      .first()
      .find('[data-testid="delete-button"]')
      .should('exist')
      .click();

    cy.get('li[role="status"]').should('have.text', toastMessage.productDelete.description);
  });
});
