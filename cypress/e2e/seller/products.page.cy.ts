import dayjs from 'dayjs';

describe('판매자 상품 관련 테스트', () => {
  beforeEach(() => {
    cy.signInWithEmailAndPassword('seller');
    cy.visit('/seller/dashboard');
  });

  it('상품 등록', () => {
    const content = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

    cy.get('[data-cy="add-button"]').should('be.visible').click();
    cy.url().should('include', '/seller/product/add');

    cy.get('input[name="imgList"]')
      .siblings('label')
      .selectFile(['./cypress/fixtures/test-image.png', './cypress/fixtures/test-image-2.png']);

    cy.get('[data-cy="image-list"]').children().should('have.length', 2);

    cy.get('input[name="title"]').should('be.visible').type(content);
    cy.get('input[name="price"]').should('be.visible').type('100');
    cy.get('textarea[name="desc"]').should('be.visible').type(content);

    cy.get('button[role="combobox"]').as('select-trigger').should('be.visible').click();
    cy.get('[data-cy="clothing_fashion"]').should('be.visible').click();
    cy.get('@select-trigger').should('have.text', '의류 및 패션');

    cy.get('[data-cy="unopened"]').should('be.visible').click();

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/seller/dashboard');

    cy.get('li[role="status"]').should(
      'have.text',
      '상품 등록을 성공 했습니다. 이전 페이지로 이동합니다.'
    );
  });

  it('상품 수정', () => {
    const content = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    cy.get('[data-cy="seller-product"]')
      .first()
      .find('[data-cy="edit-button"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/seller/product/edit');

    cy.get('input[name="title"]').should('be.visible').type(content);

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/seller/dashboard');

    cy.get('li[role="status"]').should(
      'have.text',
      '상품 수정을 성공 했습니다. 이전 페이지로 이동합니다.'
    );
  });

  it('상품 삭제', () => {
    cy.get('[data-cy="seller-product"]').should('have.length.at.least', 1);
    cy.get('[data-cy="seller-product"]')
      .first()
      .find('[data-cy="delete-button"]')
      .should('be.visible')
      .click();

    cy.get('li[role="status"]').should('have.text', '상품 삭제에 성공 했습니다.');
  });
});
