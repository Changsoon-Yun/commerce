/// <reference types="cypress" />

import { user } from '../fixtures/user.ts';

Cypress.Commands.add('signInWithEmailAndPassword', (type) => {
  const { email, password } = type === 'customer' ? user.customer : user.seller;

  cy.visit('/login');

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="email"]').invoke('val').should('eq', email);

  cy.get('input[name="password"]').type(password);
  cy.get('input[name="password"]').invoke('val').should('eq', password);

  cy.get('[data-cy="login-button"]').should('exist').click();
  cy.url().should('eq', 'http://localhost:5173/');
});

Cypress.Commands.add('signOut', () => {
  cy.visit('/');
  cy.signInWithEmailAndPassword('seller');
  cy.get('[data-cy="header-dropdown-trigger"]').should('be.visible').click();
  cy.get('[data-cy="sign-out-button"]').should('be.visible').click();
});

Cypress.Commands.add('sortAndVerify', (sortOption, sortingCriteria, compareFunction) => {
  cy.get(`[data-cy="filter-button-${sortOption}"]`).click();
  cy.get('[data-cy="product-card"]').then(($products) => {
    const initialSortingCriteria = $products
      .map((_index, element) => Cypress.$(element).find(`[data-cy="${sortingCriteria}"]`).text())
      .get();
    const sortedSortingCriteria = [...initialSortingCriteria].sort(compareFunction);

    cy.get('[data-cy="product-card"]').each(($product, index) => {
      cy.wrap($product)
        .find(`[data-cy="${sortingCriteria}"]`)
        .should('contain', sortedSortingCriteria[index]);
    });
  });
});

Cypress.Commands.add('addCart', () => {
  cy.signInWithEmailAndPassword('seller');
  cy.visit('/');
  cy.get('[data-cy="category-product-list"]')
    .first()
    .find('[data-cy="product-card"]')
    .first()
    .click();

  cy.get('[data-cy="cart-button"]').should('be.visible').should('have.text', '찜하기').click();
  cy.window().then((win) => {
    const localStorageValue = win.localStorage.getItem('cart');
    cy.url().then((url) => {
      const urlParts = url.split('/');
      const productId = urlParts[urlParts.length - 1];

      if (localStorageValue !== null) {
        const productIdArray = JSON.parse(localStorageValue);
        const productIdExists = productIdArray.includes(productId);
        expect(productIdExists).to.be.true;
      } else {
        expect.fail('로컬 스토리지에 productId가 존재하지 않습니다.');
      }
    });
  });
});
// Cypress.Commands.add('signOut', () => {
//   return firebase.auth().signOut();
// });

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
