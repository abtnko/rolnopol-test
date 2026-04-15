import { expect, test } from "../../utils/fixtures";
import { pageUrls } from "../../utils/page-urls";

test.describe("Authentication", () => {
	test("User registers a new account and logs in successfully", async ({ registerPage, loginPage, profilePage, page }) => {
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
		await profilePage.expectUserDetails(displayName, email);
		await expect(page.locator("#statusText")).toHaveText("Active");
	});
});
