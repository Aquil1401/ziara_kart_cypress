const dealerModalLocators = {
  modalContainer: 'div[class*="fixed inset-0"]',
  shopNameInput: 'input[name="shopName"]',
  ownerNameInput: 'input[name="ownerName"]',
  phoneInput: 'input[name="phone"]',
  emailInput: 'input[name="email"]',
  cityInput: 'input[name="city"]',
  gstInput: 'input[name="gst"]',
  submitButton: 'button:contains("Submit Request")',
  closeModalButton: 'button:contains("✕")',
  validationError: 'p.text-red-500',
};

module.exports = { dealerModalLocators };
