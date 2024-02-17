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
  cy.get('[data-cy="header-dropdown-trigger"]').should('exist').click();
  cy.get('[data-cy="sign-out-button"]').should('exist').click();
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
