const cartLocators = {
  cartDrawer: 'aside',
  closeButton: 'aside button:contains("✕")',
  emptyCartText: 'aside p:contains("Cart is empty")',
  cartItemRow: 'div.flex.items-center.justify-between.py-2, div.flex.items-center.gap-3',
  cartItemName: 'p.font-medium, span.font-medium',
  totalAmountText: 'aside span.text-emerald-700',
  proceedOrderButton: 'aside button:contains("Proceed for Order")',
};

module.exports = { cartLocators };
