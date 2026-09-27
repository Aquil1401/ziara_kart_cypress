const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports/raw",
    overwrite: false,
    html: false,
    json: true
  },

  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  video: false,

  e2e: {
    baseUrl: process.env.BASE_URL || "https://ziarakart.vercel.app",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",

    setupNodeEvents(on, config) {
      return config;
    }
  }
});
