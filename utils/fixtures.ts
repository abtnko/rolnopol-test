import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProfilePage } from "../pages/profile.page";
import { RegisterPage } from "../pages/register.page";

type Fixtures = {
  loginPage: LoginPage;
  profilePage: ProfilePage;
  registerPage: RegisterPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },
  registerPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
});

export { expect } from "@playwright/test";
