import { expect, type APIRequestContext, type BrowserContext } from "@playwright/test";
import { apiUrls } from "./page-urls";
import { env } from "./env";

export class Helpers {
  constructor(
    private readonly request: APIRequestContext,
    private readonly context: BrowserContext,
  ) {}

  async apiLogin(email: string, password: string): Promise<void> {
    const response = await this.request.post(apiUrls.login, {
      data: { email, password },
    });

    if (!response.ok()) {
      throw new Error(`Login API request failed with status ${response.status()}`);
    }

    const { data } = await response.json();

    await this.context.addCookies([
      { name: "rolnopolToken", value: data.token, url: env.BASE_URL },
      { name: "rolnopolIsLogged", value: "true", url: env.BASE_URL },
    ]);
  }

  async expectIsoDateString(value: unknown) {
    expect(typeof value).toBe("string");
    expect(Number.isNaN(Date.parse(value as string))).toBe(false);
  }
}
