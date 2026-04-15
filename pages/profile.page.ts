import type { Locator, Page } from "@playwright/test";
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

  async getUserDetails() {
    return {
      displayName: await this.displayedName.textContent(),
      email: await this.emailValue.textContent(),
    };
  }
}
