declare namespace Cypress {
  interface Chainable {
    signInWithEmailAndPassword(type: 'seller' | 'customer'): void;
    signOut(): void;
  }
}
