const { BasePage } = require('./BasePage');
const { productsLocators } = require('../locators/products.locators');

class HomePage extends BasePage {
  get productCards() {
    return cy.get(productsLocators.productCard);
  }

  get categorySelect() {
    return cy.get(productsLocators.categorySelect);
  }

  get showingCountText() {
    return cy.contains(/Showing \d+ of \d+ products/i);
  }

  /**
   * Select a category from the dropdown (e.g. 'Toothbrush', 'Home Cleaning', 'All').
   */
  selectCategory(categoryName) {
    this.categorySelect.should('be.visible').select(categoryName);
  }

  /**
   * Get all category option labels from the select dropdown.
   */
  getCategoryOptions() {
    return this.categorySelect.find('option').then(($options) => {
      return [...$options].map((opt) => opt.innerText.trim());
    });
  }

  /**
   * Get the total count of currently visible product cards.
   */
  getProductCount() {
    return cy.get('body').then(($body) => {
      const cards = $body.find(productsLocators.productCard);
      return cards.length;
    });
  }

  /**
   * Get all visible product titles.
   */
  getVisibleProductTitles() {
    return this.productCards.find(productsLocators.productTitle).then(($titles) => {
      return [...$titles].map((el) => el.innerText.trim());
    });
  }

  /**
   * Finds a product card by title substring.
   */
  getProductCardByName(productName) {
    return cy.contains(productsLocators.productCard, productName);
  }

  /**
   * Click "Request Access" button on a product card (Guest mode).
   */
  clickRequestAccess(productName) {
    const target = productName ? this.getProductCardByName(productName) : this.productCards.first();
    target.find(productsLocators.requestAccessButton).scrollIntoView().click();
    cy.get('input[name="shopName"]', { timeout: 10000 }).should('be.visible');
  }

  /**
   * Click "Add" button to add a product to cart (Dealer mode).
   */
  addProductToCart(productName) {
    this.getProductCardByName(productName)
      .find(productsLocators.addButton)
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  /**
   * Increment product quantity inside product card (+ button).
   */
  incrementProductQuantity(productName) {
    this.getProductCardByName(productName)
      .find(productsLocators.incrementButton)
      .scrollIntoView()
      .click();
  }

  /**
   * Decrement product quantity inside product card (− button).
   */
  decrementProductQuantity(productName) {
    this.getProductCardByName(productName)
      .find(productsLocators.decrementButton)
      .scrollIntoView()
      .click();
  }

  /**
   * Read quantity number displayed on product card.
   */
  getCardQuantity(productName) {
    return this.getProductCardByName(productName)
      .find(productsLocators.quantityText)
      .invoke('text')
      .then((qtyText) => parseInt(qtyText.trim(), 10));
  }

  /**
   * Check if prices are blurred (Guest mode verification).
   */
  arePricesBlurred() {
    return cy.get('body').then(($body) => {
      return $body.find(productsLocators.blurredPrice).length > 0;
    });
  }
}

module.exports = { HomePage };
