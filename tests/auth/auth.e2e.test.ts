import { expect, test } from "../../utils/fixtures";
import { pageUrls } from "../../utils/page-urls";
import { demoUser } from "../../utils/test-data";

test.describe("Authentication E2E tests", () => {
	test("User registers a new account and logs in successfully", { tag: ["@e2e", "@smoke", "@auth", "@happy-path"] }, async ({ homePage, registerPage, loginPage, profilePage, page }) => {
		const timestamp = Date.now();
		const email = `testuser_${timestamp}@test.com`;
		const displayName = `User ${timestamp}`;
		const password = "Pass123";

		// Register new account
		await homePage.goto();
		await homePage.clickOnRegister();
		await registerPage.register(email, displayName, password);

		// Registration redirects to login page
		await page.waitForURL(pageUrls.login);

		// Login with the newly created credentials
		await loginPage.login(email, password);
		await expect(page).toHaveURL(pageUrls.profile);

		// Verify session cookies are set after successful login
		const cookies = await page.context().cookies();
		expect(cookies.find((c) => c.name === "rolnopolToken")?.value).toBeTruthy();
		expect(cookies.find((c) => c.name === "rolnopolIsLogged")?.value).toBe("true");

		// Verify the user is logged in and account is active
		const userDetails = await profilePage.getUserDetails();
		expect(userDetails.displayName).toBe(displayName);
		expect(userDetails.email).toBe(email);
		await expect(page.getByText("Active")).toBeVisible();
	});

	test("User logs out successfully", { tag: ["@e2e", "@auth", "@happy-path"] }, async ({ helpers, profilePage, page }) => {
		// Log in via API and inject session cookies into the browser
		await helpers.apiLogin(demoUser.email, demoUser.password);

		// Navigate directly to profile page
		await profilePage.goto();
		await expect(page).toHaveURL(pageUrls.profile);

		// Logout and verify redirect to home page
		await profilePage.logout();
		await expect(page).toHaveURL(pageUrls.home);

		// Verify session cookies are cleared
		const cookies = await page.context().cookies();
		expect(cookies.find((c) => c.name === "rolnopolToken")).toBeUndefined();
		expect(cookies.find((c) => c.name === "rolnopolIsLogged")).toBeUndefined();

		// Verify that accessing profile without a session redirects to login
		await profilePage.goto();
		await expect(page).toHaveURL(pageUrls.login);
	});
});
