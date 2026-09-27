const { dealerModalLocators } = require('../locators/dealer-modal.locators');

class DealerModal {
  get shopNameInput() {
    return cy.get(dealerModalLocators.shopNameInput);
  }

  get ownerNameInput() {
    return cy.get(dealerModalLocators.ownerNameInput);
  }

  get phoneInput() {
    return cy.get(dealerModalLocators.phoneInput);
  }

  get emailInput() {
    return cy.get(dealerModalLocators.emailInput);
  }

  get cityInput() {
    return cy.get(dealerModalLocators.cityInput);
  }

  get gstInput() {
    return cy.get(dealerModalLocators.gstInput);
  }

  get submitButton() {
    return cy.contains('button', 'Submit Request');
  }

  /**
   * Verify whether the modal is visible.
   */
  isModalOpen() {
    return cy.get('body').then(($body) => {
      return $body.find('input[name="shopName"]').is(':visible');
    });
  }

  /**
   * Fill out the form fields.
   */
  fillForm(data) {
    if (data.shopName) this.shopNameInput.clear().type(data.shopName);
    if (data.ownerName) this.ownerNameInput.clear().type(data.ownerName);
    if (data.phone) this.phoneInput.clear().type(data.phone);
    if (data.email) this.emailInput.clear().type(data.email);
    if (data.city) this.cityInput.clear().type(data.city);
    if (data.gst) this.gstInput.clear().type(data.gst);
  }

  /**
   * Click submit button.
   */
  submit() {
    this.submitButton.click();
  }

  /**
   * Close the modal by pressing Escape or clicking close button.
   */
  close() {
    cy.get('body').type('{esc}');
    cy.wait(300);
  }

  /**
   * Get all visible validation error texts.
   */
  getValidationErrors() {
    return cy.get(dealerModalLocators.validationError).then(($errors) => {
      return [...$errors].map((el) => el.innerText.trim()).filter(Boolean);
    });
  }
}

module.exports = { DealerModal };
