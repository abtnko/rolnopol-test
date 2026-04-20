# Coding Standards

## Page Object Pattern

Page Objects encapsulate UI interactions. Tests own all assertions.

### Rules

- **No assertions in Page Objects.** Never use `expect()` inside a Page Object.
- **Keep verifications in test files.** All `expect()` calls belong in `.test.ts` files.
- **Return values, not assertions.** If a test needs to verify state, expose a getter or return the relevant value.
- **One Page Object per page/component.** Group related interactions together.
- **Use semantic locators.** Prefer `getByTestId`, `getByRole`, `getByLabel`, `getByText` over CSS selectors or XPath.
- **Encapsulate non-obvious selectors in Page Objects.** If a selector is not self-explanatory (e.g. `getByTestId("nav-register")`), wrap it in a Page Object method or getter. If the selector is self-describing and used only once (e.g. `getByRole("link", { name: "Sign In" })`), it can be used inline in the test.
