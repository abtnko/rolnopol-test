import { test as setup } from "@playwright/test";
import { pageUrls } from "../../utils/page-urls";
import { demoUser } from "../../utils/test-data";

setup("authenticate via UI", async ({ page }) => {
  await page.goto(pageUrls.login);
  await page.getByTestId("email-input").fill(demoUser.email);
  await page.getByTestId("password-input").fill(demoUser.password);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForURL(pageUrls.profile);

  // No addCookies() needed:
  // rolnopolToken — the browser automatically stores it from the Set-Cookie response header.
  // rolnopolIsLogged — set by frontend JavaScript after a successful login response.
  // Both cookies are present in the browser context naturally after UI login.
  await page.context().storageState({ path: "utils/auth.ui.json" });
});
