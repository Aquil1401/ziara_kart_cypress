const headerLocators = {
  logoLink: 'header a[href="/"]',
  homeLink: 'header a:contains("Home")',
  aboutUsLink: 'header a:contains("About Us")',
  ourProductsLink: 'header a:contains("Our Products")',
  distributorLink: 'header a:contains("Distributor")',
  cartButton: 'header button:contains("Cart")',
  searchInput: 'input[placeholder*="Search products"]',
};

module.exports = { headerLocators };
