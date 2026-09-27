const { cartLocators } = require('../locators/cart.locators');

class CartDrawer {
  get drawer() {
    return cy.get(cartLocators.cartDrawer);
  }

  get closeButton() {
    return cy.get(cartLocators.closeButton);
  }

  get emptyCartMessage() {
    return cy.get(cartLocators.emptyCartText);
  }

  get proceedButton() {
    return cy.get(cartLocators.proceedOrderButton);
  }

  get totalAmountText() {
    return cy.get(cartLocators.totalAmountText);
  }

  /**
   * Close the cart slide-over drawer by clicking ✕.
   */
  close() {
    this.closeButton.click();
    cy.get('aside.translate-x-full', { timeout: 5000 }).should('exist');
  }

  /**
   * Check if the cart shows empty state.
   */
  isEmpty() {
    return cy.get('body').then(($body) => {
      return $body.find('aside p:contains("Cart is empty")').length > 0;
    });
  }

  /**
   * Get the total amount shown in the cart (e.g. ₹280 -> 280).
   */
  getTotalAmount() {
    return this.totalAmountText.invoke('text').then((text) => {
      const clean = text.replace(/[^0-9]/g, '');
      return parseInt(clean, 10);
    });
  }

  /**
   * Click "Proceed for Order" which navigates to /checkout.
   */
  proceedToCheckout() {
    this.proceedButton.should('be.enabled').click();
    cy.url({ timeout: 10000 }).should('include', '/checkout');
  }
}

module.exports = { CartDrawer };
