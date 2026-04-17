import { expect, test } from "../../utils/fixtures";
import { apiUrls } from "../../utils/page-urls";
import { demoUser } from "../../utils/test-data";

test.describe("Authentication API tests", () => {
	test("Login endpoint returns expected payload for valid credentials", { tag: ["@api", "@auth", "@happy-path"] }, async ({ request, helpers }) => {
		const response = await request.post(apiUrls.login, {
			data: {
				email: demoUser.email,
				password: demoUser.password,
			},
		});

		expect(response.status()).toBe(200);
		expect(response.headers()["content-type"]).toContain("application/json");
		const body = await response.json();

		expect(body.success).toBe(true);
		expect(body.message).toBe("Login successful");
		helpers.expectIsoDateString(body.timestamp);
		expect(body.data).toBeDefined();

		expect(typeof body.data.token).toBe("string");
		expect(body.data.token).not.toBe("");
		helpers.expectIsoDateString(body.data.loginTime);
		expect(body.data.expiration).toMatchObject({ hours: 24 });

		expect(body.data.user.id).toBe(demoUser.id);
		expect(typeof body.data.user.id).toBe("number");
		expect(body.data.user.id).toBeGreaterThan(0);
		expect(body.data.user.username).toBe(demoUser.username);
		expect(body.data.user.displayedName).toBe(demoUser.displayedName);
		expect(body.data.user.email).toBe(demoUser.email);
		expect(body.data.user.isActive).toBe(true);
		helpers.expectIsoDateString(body.data.user.createdAt);
		helpers.expectIsoDateString(body.data.user.updatedAt);
		helpers.expectIsoDateString(body.data.user.lastLogin);
	});

	test("Login endpoint rejects invalid password", { tag: ["@api", "@auth", "@negative"] }, async ({ request, helpers }) => {
		const response = await request.post(apiUrls.login, {
			data: {
				email: demoUser.email,
				password: "wrongPassword",
			},
		});

		expect(response.status()).toBe(401);
		expect(response.headers()["content-type"]).toContain("application/json");
		const body = await response.json();

		expect(body.success).toBe(false);
		expect(body.error).toBe("Invalid credentials");
		helpers.expectIsoDateString(body.timestamp);
	});
});
