# rolnopol-test

Test framework for [rolnopol](https://github.com/jaktestowac/rolnopol) web app

## About

This project contains automated tests for the rolnopol web app. Tests are written in TypeScript using [Playwright](https://playwright.dev/).

## Planned test types

**End-to-end smoke tests**
Cover the most critical user paths. Verify that key user flows work as expected.

**API tests**
Test the business logic with functional tests at the API level.

**UI tests with mocked backend**
Test the functionality of UI components behavior in isolation from backend.

**Visual regression tests**
Capture and compare screenshots of business-critical pages using [`@argos-ci/playwright/reporter`](https://argos-ci.com).

---
