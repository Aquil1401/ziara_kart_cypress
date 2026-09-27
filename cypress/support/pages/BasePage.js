const { headerLocators } = require('../locators/header.locators');

class BasePage {
  get searchInput() {
    return cy.get(headerLocators.searchInput);
  }

  get cartButton() {
    return cy.get(headerLocators.cartButton);
  }

  get homeLink() {
    return cy.get(headerLocators.homeLink).first();
  }

  get aboutUsLink() {
    return cy.get(headerLocators.aboutUsLink).first();
  }

  get ourProductsLink() {
    return cy.get(headerLocators.ourProductsLink).first();
  }

  get distributorLink() {
    return cy.get(headerLocators.distributorLink).first();
  }

  /**
   * Navigate to a path and wait for React root to mount.
   */
  navigate(path = '/') {
    cy.visit(path);
    cy.get('#root', { timeout: 15000 }).should('exist');
  }

  /**
   * Sets up verified dealer access state in localStorage and mocks approval response.
   */
  setupDealerAccess(token = 'test-qa-dealer-token', shop = 'QA Mart', owner = 'QA Lead') {
    cy.intercept('**/macros/s/**', {
      statusCode: 200,
      body: { success: true, status: 'Approved' }
    }).as('dealerAuthCheck');

    // Injects dealer credentials before React app scripts mount
    Cypress.on('window:before:load', (win) => {
      win.localStorage.setItem('dealerToken', token);
      win.localStorage.setItem('dealerShop', shop);
      win.localStorage.setItem('dealerOwner', owner);
    });
  }

  /**
   * Waits for the product catalog to completely finish loading and rendering.
   * Handles client-side API streaming and dynamic product population.
   */
  waitForProductsToLoad(timeout = 25000) {
    cy.get('div.bg-white.rounded-2xl.shadow', { timeout }).first().should('be.visible');
    cy.contains(/Showing \d+ of \d+ products/i, { timeout }).should('be.visible');
  }

  /**
   * Search for a term using the global header search input.
   */
  searchProduct(term) {
    this.searchInput.clear().type(term);
  }

  /**
   * Clear the search input.
   */
  clearSearch() {
    this.searchInput.clear();
  }

  /**
   * Get the current count displayed on the header Cart button (e.g. "Cart (2)" -> 2).
   */
  getCartCount() {
    return this.cartButton.invoke('text').then((text) => {
      const match = text.match(/\((\d+)\)/);
      return match ? parseInt(match[1], 10) : 0;
    });
  }

  /**
   * Open the slide-over cart drawer.
   */
  openCart() {
    this.cartButton.click();
    cy.get('aside.translate-x-0', { timeout: 10000 }).should('be.visible');
  }
}

module.exports = { BasePage };
