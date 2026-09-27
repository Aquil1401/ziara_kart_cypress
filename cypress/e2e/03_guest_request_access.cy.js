const { HomePage } = require('../support/pages/HomePage');
const { DealerModal } = require('../support/pages/DealerModal');
const testData = require('../fixtures/ziarakart.json');

describe('ZiaraKart Guest Mode & Dealer Request Access Modal', () => {
  let homePage;
  let dealerModal;

  beforeEach(() => {
    homePage = new HomePage();
    dealerModal = new DealerModal();
    homePage.navigate('/');
    homePage.waitForProductsToLoad();
  });

  it('TC09 - Guest users see blurred wholesale prices and Request Access CTA', () => {
    homePage.arePricesBlurred().should('be.true');

    homePage.productCards.first()
      .find('button:contains("Request Access")')
      .should('be.visible');
  });

  it('TC10 - Clicking Request Access opens dealer verification modal', () => {
    homePage.clickRequestAccess();
    dealerModal.isModalOpen().should('be.true');
    dealerModal.shopNameInput.should('be.visible');
    dealerModal.phoneInput.should('be.visible');
    dealerModal.close();
  });

  it('TC11 - Dealer modal validates required fields and invalid formats', () => {
    homePage.clickRequestAccess();
    dealerModal.shopNameInput.should('be.visible');

    // Fill invalid phone (less than 10 digits) and invalid email
    dealerModal.fillForm({
      shopName: '',
      ownerName: '',
      phone: testData.guestDealerForm.invalidPhone,
      email: testData.guestDealerForm.invalidEmail,
    });

    dealerModal.submit();

    // Verify validation errors appear on the page
    dealerModal.getValidationErrors().should((errors) => {
      expect(errors.length).to.be.greaterThan(0);
      expect(errors.some((e) => e.includes('10-digit') || e.includes('phone') || e.includes('numbers'))).to.be.true;
      expect(errors.some((e) => e.includes('Invalid email') || e.includes('email'))).to.be.true;
    });

    // Close modal
    dealerModal.close();
  });
});
