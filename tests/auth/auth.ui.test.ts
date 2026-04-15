import { expect, test } from "../../utils/fixtures";
import { pageUrls } from "../../utils/page-urls";

test.describe("Authentication UI tests", () => {
	test("Login with invalid credentials stays on login page and shows error toast", { tag: ["@ui", "@auth", "@negative"] }, async ({ loginPage, page, commonMock, loginMock }) => {
		await commonMock.getFeatureFlags();
		await commonMock.getVersion();
		await loginMock.loginFailed();
        
        // Attempt login with invalid credentials
		await loginPage.goto();
		await loginPage.login("wrong@test.com", "wrongpass");

        // User should remain on login page and see error toast message
		await expect(page).toHaveURL(pageUrls.login);
		await expect(page.getByRole("heading", { name: "Login to Your User Account" })).toBeVisible();

		const toast = page.locator(".notification.error");
		await expect(toast).toBeVisible();
		await expect(toast.locator(".notification-message")).toHaveText("Invalid credentials");
	});
});
