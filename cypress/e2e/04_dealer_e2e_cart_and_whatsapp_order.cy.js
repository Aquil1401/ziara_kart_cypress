const { HomePage } = require('../support/pages/HomePage');
const { CartDrawer } = require('../support/pages/CartDrawer');
const { CheckoutPage } = require('../support/pages/CheckoutPage');
const testData = require('../fixtures/ziarakart.json');

describe('ZiaraKart Dealer E2E: Cart, Quantity & WhatsApp Order Placement', () => {
  let homePage;
  let cartDrawer;
  let checkoutPage;

  beforeEach(() => {
    homePage = new HomePage();
    cartDrawer = new CartDrawer();
    checkoutPage = new CheckoutPage();

    // Setup authenticated dealer access before visiting
    homePage.setupDealerAccess(
      testData.dealerAuth.token,
      testData.dealerAuth.shop,
      testData.dealerAuth.owner
    );

    homePage.navigate('/');
    homePage.waitForProductsToLoad();
  });

  it('TC12 - Dealer can add items to cart, modify quantity, and inspect live cart total', () => {
    // 1. Initial Cart should be 0
    homePage.getCartCount().should('eq', 0);

    // 2. Select first available product and click Add
    homePage.getVisibleProductTitles().then((titles) => {
      const firstProductName = titles[0];
      homePage.addProductToCart(firstProductName);

      // 3. Verify header cart counter increments to 1
      homePage.getCartCount().should('eq', 1);

      // 4. Increment quantity with "+" button
      homePage.incrementProductQuantity(firstProductName);
      homePage.getCartCount().should('eq', 2);
      homePage.getCardQuantity(firstProductName).should('eq', 2);

      // 5. Open Cart Drawer and verify total
      homePage.openCart();
      cartDrawer.isEmpty().should('be.false');
      cartDrawer.getTotalAmount().should('be.greaterThan', 0);

      // 6. Close Cart Drawer
      cartDrawer.close();
    });
  });

  it('TC13 - Full Purchase Journey: Add to cart, proceed to checkout, submit order via WhatsApp', () => {
    // 1. Add product to cart
    homePage.getVisibleProductTitles().then((titles) => {
      const firstProductName = titles[0];
      homePage.addProductToCart(firstProductName);
      homePage.getCartCount().should('eq', 1);

      // 2. Open Cart drawer and click "Proceed for Order"
      homePage.openCart();
      cartDrawer.proceedToCheckout();

      // 3. Verify URL is /checkout
      cy.url().should('include', '/checkout');

      // 4. Fill Delivery Details on checkout page
      checkoutPage.fillDeliveryDetails(testData.checkoutCustomer);

      // 5. Place order and intercept window.open to verify WhatsApp message URL
      checkoutPage.submitOrderAndInterceptWhatsApp();

      // 6. Verify WhatsApp URL structure and payload details
      cy.get('@windowOpen').should((stub) => {
        expect(stub).to.have.been.calledOnce;
        const whatsappUrl = stub.getCall(0).args[0];
        expect(whatsappUrl).to.include(testData.supportWhatsAppNumber);
        expect(whatsappUrl).to.include('New ZiaraKart Wholesale Order');
        expect(whatsappUrl).to.include(testData.checkoutCustomer.shopName);
        expect(whatsappUrl).to.include(testData.checkoutCustomer.ownerName);
        expect(whatsappUrl).to.include(testData.checkoutCustomer.phone);
      });

      // 7. Verify order confirmation screen appears in the application
      checkoutPage.thankYouMessage.should('be.visible');
      cy.contains('Your order has been sent to us on WhatsApp').should('be.visible');
    });
  });
});
