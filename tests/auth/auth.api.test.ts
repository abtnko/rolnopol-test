import { expect, test } from "../../utils/fixtures";
import { env } from "../../utils/env";
import { apiUrls } from "../../utils/page-urls";

test.describe("Authentication API tests", () => {
	test("Login endpoint returns expected payload for valid credentials", { tag: ["@api", "@auth", "@happy-path"] }, async ({ request }) => {
		const response = await request.post(apiUrls.login, {
			data: {
				email: env.DEMO_USER_EMAIL,
				password: env.DEMO_USER_PASSWORD,
			},
		});

		expect(response.status()).toBe(200);
		const body = await response.json();
		expect.soft(body.success).toBe(true);
		expect.soft(body.message).toBe("Login successful");
		expect.soft(body.timestamp).toBeTruthy();

		expect.soft(body.data.token).toBeTruthy();
		expect.soft(body.data.loginTime).toBeTruthy();
		expect.soft(body.data.expiration.hours).toBe(24);

		expect.soft(body.data.user.id).toBeTruthy();
		expect.soft(body.data.user.username).toBeTruthy();
		expect.soft(body.data.user.displayedName).toBe(env.DEMO_USER_DISPLAY_NAME);
		expect.soft(body.data.user.email).toBe(env.DEMO_USER_EMAIL);
		expect.soft(body.data.user.isActive).toBe(true);
		expect.soft(body.data.user.createdAt).toBeTruthy();
		expect.soft(body.data.user.updatedAt).toBeTruthy();
		expect.soft(body.data.user.lastLogin).toBeTruthy();
	});

	test("Login endpoint rejects invalid password", { tag: ["@api", "@auth", "@negative"] }, async ({ request }) => {
		const response = await request.post(apiUrls.login, {
			data: {
				email: env.DEMO_USER_EMAIL,
				password: "wrongPassword",
			},
		});

		expect(response.status()).toBe(401);
		const body = await response.json();
		expect.soft(body.success).toBe(false);
		expect.soft(body.timestamp).toBeTruthy();
		expect.soft(body.error).toBe("Invalid credentials");
	});
});
