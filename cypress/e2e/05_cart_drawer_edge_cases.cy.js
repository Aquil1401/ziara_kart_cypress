const { HomePage } = require('../support/pages/HomePage');
const { CartDrawer } = require('../support/pages/CartDrawer');
const testData = require('../fixtures/ziarakart.json');

describe('ZiaraKart Cart Drawer Edge Cases', () => {
  let homePage;
  let cartDrawer;

  beforeEach(() => {
    homePage = new HomePage();
    cartDrawer = new CartDrawer();

    homePage.setupDealerAccess(
      testData.dealerAuth.token,
      testData.dealerAuth.shop,
      testData.dealerAuth.owner
    );

    homePage.navigate('/');
    homePage.waitForProductsToLoad();
  });

  it('TC14 - Empty cart displays empty message and disabled proceed button', () => {
    homePage.openCart();
    cartDrawer.isEmpty().should('be.true');

    // Verify Proceed button is disabled when cart has 0 items
    cartDrawer.proceedButton.should('be.disabled');

    cartDrawer.close();
  });

  it('TC15 - Decrementing product to zero removes item and resets cart', () => {
    homePage.getVisibleProductTitles().then((titles) => {
      const firstProductName = titles[0];

      // Add 1 item
      homePage.addProductToCart(firstProductName);
      homePage.getCartCount().should('eq', 1);

      // Decrement item to 0
      homePage.decrementProductQuantity(firstProductName);
      homePage.getCartCount().should('eq', 0);

      // Open Cart drawer -> verify it is empty again
      homePage.openCart();
      cartDrawer.isEmpty().should('be.true');
      cartDrawer.proceedButton.should('be.disabled');

      cartDrawer.close();
    });
  });
});
