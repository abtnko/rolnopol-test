import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { pageUrls } from "../utils/page-urls";
import { BasePage } from "./base.page";

export class ProfilePage extends BasePage {
  protected readonly pageUrl = pageUrls.profile;
  private readonly displayedName: Locator;
  private readonly emailValue: Locator;

  constructor(page: Page) {
    super(page);
    this.displayedName = this.page.getByTestId("displayed-name");
    this.emailValue = this.page.getByTestId("email-value");
  }

  async expectUserDetails(displayName: string, email: string) {
    await expect(this.displayedName).toHaveText(displayName);
    await expect(this.emailValue).toHaveText(email);
  }
}
