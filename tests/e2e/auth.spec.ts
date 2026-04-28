import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { NavBar } from "../../components/NavBar";
import { UserBuilder } from "../../builders/UserBuilders";

test.describe("Autenticación", () => {
  test("registro exitoso de nuevo usuario", async ({ page }) => {
    const uniqueId = Date.now();
    const user = new UserBuilder()
      .withName(`Usuario Prueba ${uniqueId}`)
      .withEmail(`user${uniqueId}@example.com`)
      .withPassword("Password123!")
      .withPhone("555-567-8901")
      .withAddress("123 Test Ave")
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

    const navBar = new NavBar(page);
    await expect(navBar.loggedInText).toBeVisible();
    await expect(navBar.loggedInText).toContainText("Logged in as");
  });

  test("login exitoso con usuario registrado", async ({ page }) => {
    const uniqueId = Date.now();
    const user = new UserBuilder()
      .withName(`Usuario Login ${uniqueId}`)
      .withEmail(`login${uniqueId}@example.com`)
      .withPassword("Password123!")
      .withPhone("555-567-8902")
      .withAddress("456 Login St")
      .withCountry("United States")
      .withState("California")
      .withCity("Los Angeles")
      .withZipcode("90002")
      .build();

    const registerPage = new RegisterPage(page);
    const navBar = new NavBar(page);
    await registerPage.goto();
    await registerPage.fillSignupForm(user.name, user.email);
    await registerPage.submitRegistration();
    await registerPage.fillAccountInfo(user);
    await registerPage.createAccount();

    await navBar.logout();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    await expect(page).not.toHaveURL(/.*\/login$/);
    await expect(navBar.loggedInText).toBeVisible();
    await expect(navBar.loggedInText).toContainText("Logged in as");
  });

  test("logout exitoso", async ({ page }) => {
    const uniqueId = Date.now();
    const user = new UserBuilder()
      .withName(`Usuario Logout ${uniqueId}`)
      .withEmail(`logout${uniqueId}@example.com`)
      .withPassword("Password123!")
      .withPhone("555-567-8903")
      .withAddress("789 Logout Ave")
      .withCountry("United States")
      .withState("California")
      .withCity("Los Angeles")
      .withZipcode("90003")
      .build();

    const registerPage = new RegisterPage(page);
    const navBar = new NavBar(page);
    await registerPage.goto();
    await registerPage.fillSignupForm(user.name, user.email);
    await registerPage.submitRegistration();
    await registerPage.fillAccountInfo(user);
    await registerPage.createAccount();

    await navBar.logout();

    await expect(page).toHaveURL(/.*\/login$/);
  });
});
