// ***********************************************************
// ZiaraKart Cypress Support File
// ***********************************************************

import './commands';

// Prevent uncaught third-party or client-side exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
