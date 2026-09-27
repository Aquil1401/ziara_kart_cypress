const productsLocators = {
  categorySelect: 'select',
  productCard: 'div.bg-white.rounded-2xl.shadow',
  productTitle: 'h3',
  productCategory: 'p.text-\\[11px\\]',
  productPrice: 'span.font-bold',
  blurredPrice: 'span.blur-sm',
  requestAccessButton: 'button:contains("Request Access")',
  addButton: 'button:contains("Add")',
  incrementButton: 'button:contains("+")',
  decrementButton: 'button:contains("−")',
  quantityText: 'span.min-w-\\[1\\.5rem\\]',
  outOfStockBadge: 'div:contains("Out of Stock")',
  noProductsFound: ':contains("No products found")',
};

module.exports = { productsLocators };
