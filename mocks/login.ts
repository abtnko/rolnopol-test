import type { Page } from "@playwright/test";
import { env } from "../utils/env";
import { apiUrls } from "../utils/page-urls";

export class LoginMock {
  private registeredMocks: string[] = [];
  private usedMocks: string[] = [];

  constructor(private readonly page: Page) {}

  registerMock(name: string) {
    this.registeredMocks.push(name);
  }

  useMock(name: string) {
    this.usedMocks.push(name);
  }

  getUnusedMocks(): string[] {
    return this.registeredMocks.filter((name) => !this.usedMocks.includes(name));
  }

  async loginFailed(): Promise<void> {
    this.registerMock(`POST ${apiUrls.login}`);
    await this.page.route(`${env.BASE_URL}${apiUrls.login}`, (route) => {
      this.useMock(`POST ${apiUrls.login}`);
      return route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ success: false, timestamp: new Date().toISOString(), error: "Invalid credentials" }),
      });
    });
  }
}
