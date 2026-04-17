import { env } from "./env";

export const demoUser = {
    id: 1,
    username: "demo",
    email: env.DEMO_USER_EMAIL,
    password: env.DEMO_USER_PASSWORD,
    displayedName: env.DEMO_USER_DISPLAY_NAME,
  };