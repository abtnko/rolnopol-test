import type { Locator, Page } from "@playwright/test";
import { pageUrls } from "../utils/page-urls";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  protected readonly pageUrl = pageUrls.login;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId("email-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.loginSubmitButton = this.page.getByTestId("login-submit-btn");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }
}
