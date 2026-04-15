import type { Page } from "@playwright/test";
import { env } from "../utils/env";
import { apiUrls } from "../utils/page-urls";

export class CommonMock {
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

  async getFeatureFlags(): Promise<void> {
    this.registerMock(`GET ${apiUrls.featureFlags}`);
    await this.page.route(`${env.BASE_URL}${apiUrls.featureFlags}`, (route) => {
      this.useMock(`GET ${apiUrls.featureFlags}`);
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            flags: {
              alertsEnabled: true,
              registrationStrongPasswordEnabled: false,
            },
            updatedAt: "2026-04-05T12:23:49.714Z",
          },
        }),
      });
    });
  }

  async getVersion(): Promise<void> {
    this.registerMock(`GET ${apiUrls.version}`);
    await this.page.route(`${env.BASE_URL}${apiUrls.version}`, (route) => {
      this.useMock(`GET ${apiUrls.version}`);
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ version: "1.0.129" }),
      });
    });
  }

}