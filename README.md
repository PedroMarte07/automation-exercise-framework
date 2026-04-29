# 🎭 Automation Exercise — E2E Framework

![Playwright](https://img.shields.io/badge/Playwright-2D4A6E?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

End-to-end automation framework for [AutomationExercise.com](https://automationexercise.com) built with **Playwright** and **TypeScript**. Covers UI testing, API testing, and dynamic test data generation using the **Page Object Model** pattern with custom fixtures and the Builder pattern.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | E2E test automation framework |
| TypeScript | Strongly typed test code |
| Page Object Model | Maintainable and scalable architecture |
| Custom Fixtures | Automated user registration and authentication |
| Builder Pattern | Dynamic and reusable test data generation |
| Playwright API Client | REST API validation without external tools |

---

## 📁 Project Structure

```
automation-exercise-framework/
│
├── 📁 pages/                   → Page Object classes
│   ├── 📁 base/
│   │   └── BasePage.ts         → Abstract base class inherited by all pages
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── 📁 components/              → Reusable UI components
│   └── NavBar.ts               → Navigation bar (login state, logout)
│
├── 📁 fixtures/                → Custom Playwright fixtures
│   └── auth.fixture.ts         → Registers and authenticates a user before each test
│
├── 📁 builders/                → Test data generation
│   └── UserBuilders.ts         → Builder pattern for creating dynamic user objects
│
├── 📁 data/                    → Static test data
│   └── testData.ts
│
├── 📁 utils/                   → Helper utilities
│   └── apiHelper.ts            → Playwright API client wrapper
│
├── 📁 tests/
│   ├── 📁 e2e/                 → Full user flow tests
│   ├── 📁 negative/            → Invalid input and error handling tests
│   └── 📁 api/                 → REST API tests
│
└── playwright.config.ts        → Global configuration
```

---

## ⚙️ Installation

**Prerequisites:** Node.js v18+ and Git

```bash
# 1. Clone the repository
git clone https://github.com/PedroMarte07/Automation-Exercise-Framework.git

# 2. Navigate to the project
cd Automation-Exercise-Framework

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install
```

---

## ▶️ Running the Tests

```bash
# Run all tests
npx playwright test

# Run with UI Mode (recommended for debugging)
npx playwright test --ui

# Run with visible browser
npx playwright test --headed

# Run a specific folder
npx playwright test tests/e2e
npx playwright test tests/api
npx playwright test tests/negative

# Run a specific file
npx playwright test tests/e2e/auth.spec.ts

# Open the HTML report after a run
npx playwright show-report
```

---

## 🧪 Test Coverage

### E2E Tests
| Test | Description |
|---|---|
| Successful user registration | Creates a unique user via UI and verifies "Logged in as" |
| Successful login | Registers, logs out, then logs back in and verifies session |
| Successful logout | Verifies redirect to `/login` after logging out |
| Add product to cart | Authenticates via fixture and adds a product |
| Remove product from cart | Adds a product and verifies cart is empty after removal |
| Full checkout flow | Complete E2E: login → search → cart → checkout → confirmation |

### API Tests
| Endpoint | Method | Test |
|---|---|---|
| `/api/productsList` | GET | Returns product list with status 200 |
| `/api/searchProduct` | POST | Returns filtered results by keyword |
| `/api/verifyLogin` | POST | Returns 200 for valid credentials |

### Negative Tests
| Test | Expected Behavior |
|---|---|
| Login with wrong password | Error message is visible |
| Login with invalid email | Error message is visible |
| Login with empty fields | Validation message is visible |
| Register with existing email | Duplicate email error is shown |

---

## 🔑 Key Design Decisions

### BasePage — Abstract base class
All Page Objects extend `BasePage`, which provides shared methods like `waitForPageLoad()`. This avoids code duplication and enforces a consistent structure.

### Custom Auth Fixture
Instead of repeating the login flow in every test, the `auth.fixture.ts` automatically registers a new unique user before each test that needs authentication. Tests receive an already-authenticated `page` ready to use.

```typescript
// Every test using this fixture starts already authenticated
test("add product to cart", async ({ authenticatedPage }) => {
  const productsPage = new ProductsPage(authenticatedPage);
  await productsPage.addToCartByName(products.backpack);
  // ...
});
```

### UserBuilder — Dynamic test data
The Builder pattern creates unique user objects per test run using `Date.now()`, preventing conflicts between parallel test executions.

```typescript
const user = new UserBuilder()
  .withName(`Test User ${Date.now()}`)
  .withEmail(`user${Date.now()}@example.com`)
  .withPassword("Password123!")
  .build();
```

---

## 👤 Author

**Pedro Marte** — QA Analyst Jr | ISTQB CTFL  
[LinkedIn](https://linkedin.com/in/pedro-marte-castro-67161a217) · [GitHub](https://github.com/PedroMarte07)
