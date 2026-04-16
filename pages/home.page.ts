import type { Locator, Page } from "@playwright/test";
import { pageUrls } from "../utils/page-urls";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  protected readonly pageUrl = pageUrls.home;
  private readonly registerNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.registerNavLink = this.page.getByTestId("nav-register");
  }

  async clickOnRegisterNavLink() {
    await this.registerNavLink.click();
  }
}
