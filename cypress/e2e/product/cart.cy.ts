describe('장바구니', () => {
  context('로그인 상황에 따른 버튼 동작', () => {
    it('비 로그인 찜하기', () => {
      cy.visit('/');
      cy.get('[data-testid="category-product-list"]')
        .first()
        .find('[data-testid="product-card"]')
        .first()
        .click();

      cy.get('[data-testid="buy-button"]').should('not.exist');
      cy.get('[data-testid="cart-button"]').should('be.visible').click();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq('로그인한 유저만 가능합니다.');
      });
    });

    context('로그인 후 찜하기', () => {
      beforeEach(() => {
        cy.addCart();
      });
      it('페이지에서 삭제', () => {
        cy.get('[data-testid="cart-button"]')
          .should('be.visible')
          .should('have.text', '찜취소')
          .click();
      });

      it(' 카트에서 삭제', () => {
        cy.get('[data-testid="cart-count"]').should('be.visible').click();
        cy.get('[data-testid="side-cart"]').should('be.visible');
        cy.get('[data-testid="cart-item"]').first().find('[data-testid="delete-button"]').click();
      });

      afterEach(() => {
        cy.window().then((win) => {
          const localStorageValue = win.localStorage.getItem('cart');
          cy.url().then((url) => {
            const urlParts = url.split('/');
            const productId = urlParts[urlParts.length - 1];

            if (localStorageValue !== null) {
              const productIdArray = JSON.parse(localStorageValue);
              const productIdExists = productIdArray.includes(productId);
              expect(productIdExists).to.be.false;
            } else {
              expect.fail('로컬 스토리지에 productId가 존재하지 않습니다.');
            }
          });
        });
      });
    });

    it('비 로그인 구매하기', () => {
      cy.visit('/');
      cy.get('[data-testid="category-product-list"]')
        .first()
        .find('[data-testid="product-card"]')
        .first()
        .click();

      cy.get('[data-testid="buy-button"]').should('not.exist');
    });

    it('로그인 구매하기', () => {
      cy.signInWithEmailAndPassword('seller');
      cy.visit('/');
      cy.get('[data-testid="category-product-list"]')
        .first()
        .find('[data-testid="product-card"]')
        .first()
        .click();

      cy.get('[data-testid="buy-button"]').should('be.visible').click();

      cy.url().then((url) => {
        const urlParts = url.split('/');
        const productId = urlParts[urlParts.length - 1];
        cy.url().should('include', `/order/${productId}`);
      });
    });

    afterEach(() => {
      cy.signOut();
    });
  });
});
