# ZiaraKart Cypress Automation Framework (JavaScript + POM)

[![Cypress Tests](https://github.com/Aquil1401/ziara_kart_cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/Aquil1401/ziara_kart_cypress/actions/workflows/cypress.yml)
![Tests Passed](https://img.shields.io/badge/Tests-15%2F15%20Passed-2ea44f?style=flat-square&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Page%20Object%20Model-orange?style=flat-square)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Cross--Repo%20Quality%20Gate-blueviolet?style=flat-square&logo=github-actions&logoColor=white)
[![Live Store](https://img.shields.io/badge/Live%20Store-ziarakart.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white)](https://ziarakart.vercel.app/)

A scalable, maintainable, and enterprise-grade UI automation framework built for **[ZiaraKart](https://ziarakart.vercel.app/)** (Jharkhand's Smart Wholesale FMCG Hub) using **Cypress + JavaScript**.

Follows strict **Page Object Model (POM)** architecture, clean locator separation, sensitive credentials management, failure screenshot captures, Mochawesome HTML reporting, and automated cross-repository GitHub Actions CI/CD regression gates.

---

## 🚀 Key Framework Features

- **Page Object Model (POM)**: Decoupled page actions, assertions, and locators.
- **Dynamic Loading Resilience**: Automatically accommodates client-side catalog rendering and network latency without brittle hardcoded timeouts.
- **Role-Based Testing**: Covers both **Guest Mode** (blurred prices, Request Access modal, input validation) and **Dealer Mode** (unblurred prices, Add to Cart, quantity adjustments).
- **End-to-End WhatsApp Order Integration**: Intercepts and asserts the dynamic WhatsApp order link generation via `cy.stub(win, 'open')` with payload validation (shop, owner, phone, items, total).
- **Failure Artifacts & Reports**:
  - Auto-captures screenshots on failure
  - Mochawesome rich HTML test report generation
- **Cross-Repository CI/CD Quality Gate**: Protects the developer codebase by executing automated regression tests before Pull Requests can be merged.

---

## 🏛️ Framework Architecture

```mermaid
graph TD
    subgraph Test_Layer["1. Test Spec Layer (BDD / E2E Scenarios)"]
        T1["01_homepage_and_navigation.cy.js"]
        T2["02_product_search_and_filter.cy.js"]
        T3["03_guest_request_access.cy.js"]
        T4["04_dealer_e2e_cart_and_whatsapp_order.cy.js"]
        T5["05_cart_drawer_edge_cases.cy.js"]
    end

    subgraph POM_Layer["2. Page Object Model (Business Actions)"]
        Base["BasePage.js (Shared Nav, Search, Dealer Auth)"]
        Home["HomePage.js (Catalog & Dynamic Wait)"]
        Cart["CartDrawer.js (Slide-over Cart & Quantities)"]
        Checkout["CheckoutPage.js (WhatsApp Interceptor)"]
        Dealer["DealerModal.js (Verification & Validation)"]
    end

    subgraph Locator_Layer["3. Locator Layer (UI Selectors)"]
        L1["header.locators.js"]
        L2["products.locators.js"]
        L3["cart.locators.js"]
        L4["checkout.locators.js"]
        L5["dealer-modal.locators.js"]
    end

    subgraph Config_Layer["4. Core Config & Data"]
        Data["fixtures/ziarakart.json"]
        Env[".env"]
        Config["cypress.config.js"]
    end

    T1 & T2 & T3 & T4 & T5 --> Base
    Base --> Home & Cart & Checkout & Dealer
    Home --> L2
    Cart --> L3
    Checkout --> L4
    Dealer --> L5
    Base --> L1
    Base --> Data & Env & Config
```

---

## 🔄 Cross-Repository CI/CD Quality Gate

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant DevRepo as Development Repo (App Repo)
    participant Preview as Preview / Production Deployment
    participant QARepo as QA Automation Repo (ziara_kart_cypress)
    
    Dev->>DevRepo: Creates Pull Request or pushes commit
    DevRepo->>QARepo: Triggers Cypress Suite (repository_dispatch webhook)
    Note over DevRepo: Pipeline pauses with yellow spinner ⏳
    Note over QARepo: Chrome runs all 15 Cypress tests
    alt All Tests Pass
        QARepo-->>DevRepo: Success status returned
        DevRepo->>Dev: Pull Request turns GREEN ✅ (Merge Allowed)
    else Any Test Fails
        QARepo-->>DevRepo: Failure status returned + Mochawesome report
        DevRepo->>Dev: Pull Request turns RED ❌ (Merge BLOCKED!)
    end
```

---

## 📁 Repository Structure

```text
ziara_kart_cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml                 # GitHub Actions CI/CD Pipeline
├── cypress/
│   ├── e2e/
│   │   ├── 01_homepage_and_navigation.cy.js
│   │   ├── 02_product_search_and_filter.cy.js
│   │   ├── 03_guest_request_access.cy.js
│   │   ├── 04_dealer_e2e_cart_and_whatsapp_order.cy.js
│   │   └── 05_cart_drawer_edge_cases.cy.js
│   ├── fixtures/
│   │   └── ziarakart.json              # Centralized test data & payloads
│   └── support/
│       ├── locators/
│       │   ├── header.locators.js       # Header navigation, search, cart button
│       │   ├── products.locators.js     # Catalog, select, product card locators
│       │   ├── cart.locators.js         # Slide-over cart drawer locators
│       │   ├── checkout.locators.js     # Delivery form & order summary locators
│       │   └── dealer-modal.locators.js # Retailer verification modal locators
│       ├── pages/
│       │   ├── BasePage.js              # Common nav, search, and dealer auth
│       │   ├── HomePage.js              # Product browsing, category filter, card actions
│       │   ├── CartDrawer.js            # Cart slide-over drawer actions & validations
│       │   ├── CheckoutPage.js          # Checkout delivery form & WhatsApp interceptor
│       │   └── DealerModal.js           # Retailer verification form & validation checks
│       ├── commands.js                  # Custom Cypress commands
│       └── e2e.js                       # Support entry & exception handling
├── docs/
│   ├── architecture.md                  # 4-layer POM architecture details
│   ├── cross-repo-ci-cd-setup.md        # Developer repo integration guide
│   ├── setup-and-execution.md           # Local execution commands & headless runs
│   └── zero-code-ai-workflow.md         # AI & MCP automation workflow
├── testdata/
│   └── ziarakart.data.js                # Test data export
├── cypress.config.js                    # Cypress configuration
├── package.json
└── README.md
```

---

## 🧪 Test Scenarios Covered (15 / 15 Passed)

| Spec File | Test Case | Description |
| :--- | :--- | :--- |
| **01_homepage_and_navigation** | TC01 | Verify page title and brand header metadata |
| | TC02 | Verify main navigation links (`Home`, `About Us`, `Our Products`, `Distributor`) |
| | TC03 | Verify category filter dropdown rendered with options |
| | TC04 | Verify footer links and WhatsApp contact integration |
| **02_product_search_and_filter** | TC05 | Search for a product by exact keyword |
| | TC06 | Case-insensitive and dynamic live search filtering |
| | TC07 | Search with non-existing term returns zero results & resets on clear |
| | TC08 | Filter products by category dropdown |
| **03_guest_request_access** | TC09 | Guest users see blurred wholesale prices and Request Access CTA |
| | TC10 | Clicking Request Access opens dealer verification modal |
| | TC11 | Form validates required fields, 10-digit phone, and email formatting |
| **04_dealer_e2e_cart_and_whatsapp_order** | TC12 | Dealer adds item to cart, increments quantity, and verifies live badge |
| | TC13 | **Full E2E Purchase Flow**: Add to cart -> Proceed to Checkout -> Fill delivery details -> Place order on WhatsApp -> Validate message payload |
| **05_cart_drawer_edge_cases** | TC14 | Empty cart displays empty message and disabled proceed button |
| | TC15 | Decrementing product to zero removes item and resets cart |

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
# Run all tests headless
npm test

# Run tests with Chrome browser window open
npm run test:headed

# Run tests in interactive Cypress UI mode
npm run test:open

# Run a specific test spec
npx cypress run --spec cypress/e2e/04_dealer_e2e_cart_and_whatsapp_order.cy.js
```

### 3. Generate HTML Report
```bash
npm run test:ci
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The workflow (`.github/workflows/cypress.yml`) runs automatically on every `push`, `pull_request`, and `repository_dispatch` / `workflow_dispatch`:
1. Checks out the repository.
2. Sets up Node.js 20.
3. Installs dependencies (`npm ci`).
4. Executes Cypress test suite headless.
5. Compiles Mochawesome HTML report and uploads screenshots/videos as artifacts.

---

## 📚 Documentation

Detailed documentation tailored for this application and the automation workflow:
- [Framework Architecture (POM)](docs/architecture.md) — Explains the 4-layer POM design, dynamic wait strategy, and WhatsApp interception.
- [Cross-Repository CI/CD Setup](docs/cross-repo-ci-cd-setup.md) — Step-by-step guide to trigger this automation suite from the development repository.
- [Zero-Code AI & MCP Automation Workflow](docs/zero-code-ai-workflow.md) — The exact autonomous AI process guide for YouTube tutorials and presentations.
- [Setup & Execution Guide](docs/setup-and-execution.md) — Step-by-step commands for headless, headed, UI mode, and HTML reporting.

---

## 👤 Author

**Md Aquil** — QA Automation Engineer & SDET
* 💼 **Open to**: **Full-Time Opportunities** (Remote / Hybrid) & **Contract QA Consulting**
* 🧪 **Testing Services**: [Ziara QA Labs](https://qa.ziaratechqlabs.in/)
* 🏢 **Company / Studio**: [Ziara TechQ Labs](https://www.ziaratechqlabs.in/)
* 🔗 **LinkedIn**: [linkedin.com/in/md-aquil-qa](https://www.linkedin.com/in/md-aquil-qa/)
* ▶️ **YouTube**: [Ziara TechQ Labs](https://www.youtube.com/@ZiaraTechQLabs)
* 📧 **Email**: [ziaratechqlabs@gmail.com](mailto:ziaratechqlabs@gmail.com)
