import type { Page } from "@playwright/test";

export abstract class BasePage {
  protected abstract readonly pageUrl: string;

  protected constructor(protected readonly page: Page) {}

  async goto() {
    await this.page.goto(this.pageUrl);
  }
}
