# ZiaraKart Setup & Test Execution Guide (Cypress)

This document provides instructions for installing dependencies, running tests across various modes, inspecting reports, and configuring CI/CD for the Cypress automation framework.

---

## 📋 Prerequisites
- **Node.js**: Version 18, 20, or 22+
- **NPM**: Version 9+
- **OS**: Windows, macOS, or Linux

---

## 📦 Installation

```bash
# 1. Clone repository
git clone https://github.com/Aquil1401/ziara_kart_cypress.git
cd ziara_kart_cypress

# 2. Install dependencies
npm install
```

---

## 🚀 Running Tests

### 1. Headless Mode (Fast Execution)
Runs all 15 test cases in headless mode:
```bash
npm test
# or
npx cypress run
```

### 2. Headed Mode (Watch Browser Live)
Opens Chrome to watch user interactions executed live:
```bash
npm run test:headed
```

### 3. Interactive Cypress UI Runner
Opens the interactive Cypress Launchpad and App UI to step through tests and time-travel debug:
```bash
npm run test:open
# or
npx cypress open
```

### 4. Running a Specific Test File
```bash
# Run only Homepage and Navigation tests
npx cypress run --spec cypress/e2e/01_homepage_and_navigation.cy.js

# Run only Search & Filter tests
npx cypress run --spec cypress/e2e/02_product_search_and_filter.cy.js

# Run only Guest Access tests
npx cypress run --spec cypress/e2e/03_guest_request_access.cy.js

# Run only Dealer E2E & WhatsApp tests
npx cypress run --spec cypress/e2e/04_dealer_e2e_cart_and_whatsapp_order.cy.js

# Run only Cart Drawer Edge Cases
npx cypress run --spec cypress/e2e/05_cart_drawer_edge_cases.cy.js
```

---

## 📊 Generating HTML Reports & Failure Artifacts

To execute the test suite, compile Mochawesome raw outputs, and generate an HTML report:
```bash
npm run test:ci
```

The resulting standalone report is placed in:
`cypress/reports/html/index.html`

### Artifact Policies:
- **Screenshots**: Automatically captured on test failure into `cypress/screenshots/`.
- **Videos**: Recorded into `cypress/videos/` when enabled.

---

## 🔄 CI/CD Pipeline

The framework includes a ready-to-run GitHub Actions workflow at `.github/workflows/cypress.yml`.

Whenever code is pushed or a PR is created to `main` or `master`:
1. GitHub spins up an `ubuntu-latest` runner.
2. Installs Node.js 20 and dependencies.
3. Executes Cypress tests in headless mode.
4. Generates and uploads the Mochawesome HTML report and failure screenshots as artifacts.
