import type { Locator, Page } from "@playwright/test";
import { pageUrls } from "../utils/page-urls";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
  protected readonly pageUrl = pageUrls.register;
  private readonly emailInput: Locator;
  private readonly displayNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId("email-input");
    this.displayNameInput = this.page.getByTestId("display-name-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.submitButton = this.page.getByTestId("register-submit-btn");
  }

  async register(email: string, displayName: string, password: string) {
    await this.emailInput.fill(email);
    await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
