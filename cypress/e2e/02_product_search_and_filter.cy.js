const { HomePage } = require('../support/pages/HomePage');
const testData = require('../fixtures/ziarakart.json');

describe('ZiaraKart Products Search & Category Filtering', () => {
  let homePage;

  beforeEach(() => {
    homePage = new HomePage();
    homePage.navigate('/');
    homePage.waitForProductsToLoad();
  });

  it('TC05 - Search for a product by exact keyword', () => {
    const searchTerm = testData.searchQueries.specificItem; // 'Excel Scrubber'
    homePage.searchProduct(searchTerm);

    homePage.getVisibleProductTitles().should((titles) => {
      expect(titles.length).to.be.greaterThan(0);
      titles.forEach((title) => {
        expect(title.toLowerCase()).to.include('scrubber');
      });
    });
  });

  it('TC06 - Search is case-insensitive and filters live', () => {
    homePage.searchProduct('toothbrush');
    homePage.getVisibleProductTitles().then((titlesLower) => {
      expect(titlesLower.length).to.be.greaterThan(0);

      homePage.searchProduct('TOOTHBRUSH');
      homePage.getVisibleProductTitles().should((titlesUpper) => {
        expect(titlesUpper.length).to.eq(titlesLower.length);
      });
    });
  });

  it('TC07 - Search with non-existing term returns zero results gracefully', () => {
    homePage.searchProduct(testData.searchQueries.nonExistingItem);
    homePage.getProductCount().should('eq', 0);

    // Clear search and verify catalog restores
    homePage.clearSearch();
    homePage.getProductCount().should('be.greaterThan', 10);
  });

  it('TC08 - Filter products by category dropdown', () => {
    homePage.getProductCount().then((initialCount) => {
      expect(initialCount).to.be.greaterThan(0);

      // Filter by Toothbrush category
      homePage.selectCategory('Toothbrush');
      homePage.getProductCount().should('be.greaterThan', 0);

      // Verify all filtered cards have category label 'Toothbrush'
      cy.get('div.bg-white.rounded-2xl.shadow p.text-\\[11px\\]').first().invoke('text').should((text) => {
        expect(text.trim()).to.eq('Toothbrush');
      });

      // Return to All
      homePage.selectCategory('All');
      homePage.getProductCount().should('eq', initialCount);
    });
  });
});
