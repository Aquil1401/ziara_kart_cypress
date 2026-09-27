const { HomePage } = require('../support/pages/HomePage');
const testData = require('../fixtures/ziarakart.json');

describe('ZiaraKart Homepage & Navigation', () => {
  let homePage;

  beforeEach(() => {
    homePage = new HomePage();
    homePage.navigate('/');
  });

  it('TC01 - Verify page title and brand header metadata', () => {
    cy.title().should('eq', testData.expectedTitle);
    homePage.homeLink.should('be.visible');
    cy.contains('ZiaraKart').should('be.visible');
  });

  it('TC02 - Verify all main navigation links are present and functional', () => {
    homePage.homeLink.should('be.visible');
    homePage.aboutUsLink.should('be.visible');
    homePage.ourProductsLink.should('be.visible');
    homePage.distributorLink.should('be.visible');

    // Navigate to About Us
    homePage.aboutUsLink.click();
    cy.url().should('include', '/about');

    // Navigate back to Home
    homePage.homeLink.click();
    cy.url().should('eq', testData.baseUrl + '/');
  });

  it('TC03 - Verify category filter options are rendered in catalog dropdown', () => {
    homePage.getCategoryOptions().should((options) => {
      expect(options.length).to.be.greaterThan(2);
      expect(options).to.include('All');
      expect(options).to.include('Toothbrush');
    });
  });

  it('TC04 - Verify footer links and WhatsApp contact integration', () => {
    cy.get(`a[href*="wa.me/${testData.supportWhatsAppNumber}"]`).first()
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', testData.supportWhatsAppNumber);

    cy.contains('footer a', 'Privacy Policy').should('be.visible');
  });
});
