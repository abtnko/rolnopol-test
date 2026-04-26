import { test as setup } from "@playwright/test";
import { apiUrls } from "../../utils/page-urls";
import { env } from "../../utils/env";
import { demoUser } from "../../utils/test-data";

setup("authenticate via API", async ({ request, context }) => {
  const response = await request.post(apiUrls.login, {
    data: { email: demoUser.email, password: demoUser.password },
  });

  const { data } = await response.json();

  // rolnopolToken — the server sends it via Set-Cookie header; the browser automatically
  // stores it in its context. Here we bypass the browser, so request.post() uses an
  // isolated HTTP client that does not share cookies with the browser context.
  // rolnopolIsLogged — set by frontend JavaScript after a successful login response,
  // which never runs here since we bypass the browser entirely.
  // Both cookies must be injected manually via addCookies().
//   await context.addCookies([
//     { name: "rolnopolToken", value: data.token, url: env.BASE_URL },
//     { name: "rolnopolIsLogged", value: "true", url: env.BASE_URL },
//   ]);

  await context.storageState({ path: "utils/auth.json" });
});
