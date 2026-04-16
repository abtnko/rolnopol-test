import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ProfilePage } from "../pages/profile.page";
import { RegisterPage } from "../pages/register.page";
import { CommonMock } from "../mocks/common";
import { LoginMock } from "../mocks/login";
import { Helpers } from "./helpers";

type Fixtures = {
  // Pages
  homePage: HomePage;
  loginPage: LoginPage;
  profilePage: ProfilePage;
  registerPage: RegisterPage;

  // API Mocks
  commonMock: CommonMock;
  loginMock: LoginMock;

  // Helpers
  helpers: Helpers;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },
  registerPage: async ({ page }, use) => { await use(new RegisterPage(page)); },
  commonMock: async ({ page }, use) => {
    const mock = new CommonMock(page);
    await use(mock);
    checkUnusedMocks(mock);
  },
  loginMock: async ({ page }, use) => {
    const mock = new LoginMock(page);
    await use(mock);
    checkUnusedMocks(mock);
  },
  helpers: async ({ request, context }, use) => { await use(new Helpers(request, context)); },
});

export { expect } from "@playwright/test";

function checkUnusedMocks(...mocks: Array<{ getUnusedMocks: () => string[] }>) {
  const allUnusedMocks: string[] = [];

  for (const mockObject of mocks) {
    const unusedMocks = mockObject.getUnusedMocks();
    allUnusedMocks.push(...unusedMocks);
  }

  if (allUnusedMocks.length > 0) {
    throw new Error(`Unused mocks detected: ${allUnusedMocks.join(", ")}`);
  }
}
