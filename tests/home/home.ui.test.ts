import { expect, test } from "../../utils/fixtures";
import { pageUrls } from "../../utils/page-urls";

test.describe("Home page UI tests", () => {
	test('"Get Started Free" navigates to the register page', { tag: ["@ui", "@navigation", "@home"] }, async ({ homePage, page, commonMock }) => {
		await commonMock.getFeatureFlags();
		await commonMock.getVersion();

		await homePage.goto();
		await page.getByRole("link", { name: "Get Started Free" }).click();

		await expect(page).toHaveURL(pageUrls.register);
	});

	test('"Sign In" navigates to the login page', { tag: ["@ui", "@navigation", "@home"] }, async ({ homePage, page, commonMock }) => {
		await commonMock.getFeatureFlags();
		await commonMock.getVersion();

		await homePage.goto();
		await page.getByRole("link", { name: "Sign In" }).click();

		await expect(page).toHaveURL(pageUrls.login);
	});
});
