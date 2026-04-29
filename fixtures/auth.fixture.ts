import { test as base, expect, Page } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { UserBuilder } from "../builders/UserBuilder";
import { NavBar } from "../components/NavBar";

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const uniqueId = Date.now();
    const user = new UserBuilder()
      .withName(`Authenticated User ${uniqueId}`)
      .withEmail(`auth${uniqueId}@example.com`)
      .withPassword("Password123!")
      .withPhone("555-123-4567")
      .withAddress("123 Auth St")
      .withCountry("United States")
      .withState("California")
      .withCity("Los Angeles")
      .withZipcode("90001")
      .build();

    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillSignupForm(user.name, user.email);
    await registerPage.submitRegistration();
    await registerPage.fillAccountInfo(user);
    await registerPage.createAccount();

    await use(page);

    const navBar = new NavBar(page);
    if (await navBar.isLoggedIn()) {
      await navBar.logout();
    }
  },
});

export { expect };
