const { checkoutLocators } = require('../locators/checkout.locators');

class CheckoutPage {
  get shopInput() {
    return cy.get(checkoutLocators.shopInput);
  }

  get ownerInput() {
    return cy.get(checkoutLocators.ownerInput);
  }

  get phoneInput() {
    return cy.get(checkoutLocators.phoneInput);
  }

  get addressTextarea() {
    return cy.get(checkoutLocators.addressInput);
  }

  get placeOrderButton() {
    return cy.contains('button', 'Place Order via WhatsApp');
  }

  get thankYouMessage() {
    return cy.contains('h2', 'Thank you for shopping with ZiaraKart!');
  }

  get orderSummaryItems() {
    return cy.get(checkoutLocators.orderSummaryItems);
  }

  get totalText() {
    return cy.get(checkoutLocators.totalPriceDisplay);
  }

  /**
   * Navigate directly to /checkout.
   */
  navigate() {
    cy.visit('/checkout');
    cy.get('#root').should('exist');
  }

  /**
   * Fill delivery details form.
   */
  fillDeliveryDetails(details) {
    if (details.shopName) this.shopInput.clear().type(details.shopName);
    if (details.ownerName) this.ownerInput.clear().type(details.ownerName);
    if (details.phone) this.phoneInput.clear().type(details.phone);
    if (details.address) this.addressTextarea.clear().type(details.address);
  }

  /**
   * Submits order and intercepts window.open to verify generated WhatsApp link.
   */
  submitOrderAndInterceptWhatsApp() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    this.placeOrderButton.click();
    this.thankYouMessage.should('be.visible');
  }
}

module.exports = { CheckoutPage };
