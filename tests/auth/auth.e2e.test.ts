import { expect, test } from "../../utils/fixtures";
import { env } from "../../utils/env";
import { pageUrls } from "../../utils/page-urls";

test.describe("Authentication E2E tests", () => {
	test("User registers a new account and logs in successfully", { tag: ["@e2e", "@auth", "@happy-path"] }, async ({ registerPage, loginPage, profilePage, page }) => {
		const timestamp = Date.now();
		const email = `testuser_${timestamp}@test.com`;
		const displayName = `User ${timestamp}`;
		const password = "Pass123";

		// Register new account
		await registerPage.goto();
		await registerPage.register(email, displayName, password);

		// Registration redirects to login page
		await page.waitForURL(pageUrls.login);

		// Login with the newly created credentials
		await loginPage.login(email, password);
		await expect(page).toHaveURL(pageUrls.profile);

		// Verify the user is logged in and account is active
		const userDetails = await profilePage.getUserDetails();
		expect(userDetails.displayName).toBe(displayName);
		expect(userDetails.email).toBe(email);
		await expect(page.locator("#statusText")).toHaveText("Active");
	});

	test("User logs out successfully", { tag: ["@e2e", "@auth", "@happy-path"] }, async ({ helpers, profilePage, page }) => {
		// Log in via API and inject session cookies into the browser
		await helpers.apiLogin(env.DEMO_USER_EMAIL, env.DEMO_USER_PASSWORD);

		// Navigate directly to profile page
		await profilePage.goto();
		await expect(page).toHaveURL(pageUrls.profile);

		// Logout and verify redirect to home page
		await profilePage.logout();
		await expect(page).toHaveURL("/");
	});
});
