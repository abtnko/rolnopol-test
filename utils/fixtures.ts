import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProfilePage } from "../pages/profile.page";
import { RegisterPage } from "../pages/register.page";
import { CommonMock } from "../mocks/common";
import { LoginMock } from "../mocks/login";

type Fixtures = {
  // Pages
  loginPage: LoginPage;
  profilePage: ProfilePage;
  registerPage: RegisterPage;

  // API Mocks
  commonMock: CommonMock;
  loginMock: LoginMock;
};

export const test = base.extend<Fixtures>({
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
