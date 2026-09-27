const checkoutLocators = {
  shopInput: 'input[name="shop"]',
  ownerInput: 'input[name="owner"]',
  phoneInput: 'input[name="phone"]',
  addressInput: 'textarea[name="address"]',
  placeOrderButton: 'button:contains("Place Order via WhatsApp")',
  thankYouHeading: 'h2:contains("Thank you for shopping with ZiaraKart!")',
  orderSummaryItems: 'ul.divide-y li',
  totalPriceDisplay: 'div.border-t span.text-gray-700, div.border-t:contains("Total")',
};

module.exports = { checkoutLocators };
