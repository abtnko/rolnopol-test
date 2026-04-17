# rolnopol-test

Test framework for [rolnopol](https://github.com/jaktestowac/rolnopol) web app

## About

This project contains automated tests for the rolnopol web app. Tests are written in TypeScript using [Playwright](https://playwright.dev/).

## Project structure

```
tests/         # Test files, organized by domain
pages/         # Page object models
mocks/         # API mock object models
utils/         # Fixtures, environment config, URL constants, helpers
```

## Test types

**End-to-end tests** (`@e2e`)
Run against a real backend. Cover critical user flows end-to-end, e.g. registration → login → profile verification.

**API tests** (`@api`)
Test REST API endpoints directly via HTTP requests. No browser involved. Validates business logic and response contracts.

**UI tests with mocked backend** (`@ui`)
Run in a browser with API responses intercepted and mocked. Test UI component behavior in isolation from the backend.

## Setup

1. Install dependencies:

```sh
npm install
```

```sh
npx playwright install
```

2. Create a `.env` file in the project root based on `.env.example` and fill in the values. Required variables are defined in `utils/env.ts`.

3. Start the rolnopol app and make sure it is reachable at `BASE_URL` from your `.env` file before running tests.

## Running tests

See all available scripts in `package.json`. Common ones:

Run all tests:

```sh
npm test
```

Run by tag:

```sh
npm test -- --grep @e2e
```

Common tag combinations:

Run all auth tests:

```sh
npm test -- --grep @auth
```

Run smoke E2E tests only:

```sh
npm test -- --grep "(?=.*@e2e)(?=.*@smoke)"
```

Run in headed mode (visible browser):

```sh
npm run test:headed
```

Run in debug mode:

```sh
npm run test:debug
```

View the HTML report after a run:

```sh
npm run test:report
```

## Conventions

- Page objects in `pages/` encapsulate selectors and actions. Assertions stay in tests. Pages are accessed in tests via fixtures defined in `utils/fixtures.ts`.
- `utils/helpers.ts` contains reusable test actions. For example, `apiLogin` calls the login API and sets session cookies in the browser. Access it in tests via the `helpers` fixture: `helpers.apiLogin(...)`.
- Mocks are set up per-test via fixtures (`commonMock`, `loginMock`, etc.). Set up only mocks that the test actually uses. Unused mocks are detected during fixture teardown and fail the test.
- All environment-specific values are read from `.env` via `utils/env.ts`. In CI, provide these as environment secrets or variables instead of a `.env` file.
- Shared test data lives in `utils/test-data.ts`. Import constants from there instead of duplicating values across tests.
- Tests are tagged with `@domain` (e.g. `@auth`) and `@type` (e.g. `@e2e`, `@api`, `@ui`) and scenario (`@happy-path`, `@negative`). Critical end-to-end flows are additionally tagged with `@smoke`.

## VS Code

Recommended extensions are listed in `.vscode/extensions.json`. VS Code will prompt you to install them when you open the project. They include the Playwright Test runner, Prettier, ESLint, and a spell checker.

## Planned improvements

**Visual regression tests**
Capture and compare screenshots of business-critical pages using [`@argos-ci/playwright/reporter`](https://argos-ci.com).

---
