import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { NavBar } from "../../components/NavBar";
import { UserBuilder } from "../../builders/UserBuilder";
import { testData } from "../../data/testData";

test.describe("Autenticación negativa", () => {
  test("login con email inválido", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(
      testData.users.invalid.email,
      testData.users.registered.password,
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/.*\/login$/);
  });

  test("login con contraseña incorrecta", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(testData.users.registered.email, "WrongPassword!");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/.*\/login$/);
  });

  test("login con campos vacíos", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login("", "");

    const invalidFields = page.locator(
      'form:has-text("Login") >> input:invalid',
    );
    await expect(invalidFields).toHaveCount(2);
    await expect(page).toHaveURL(/.*\/login$/);
  });

  test("registro con email ya existente", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    const user = new UserBuilder()
      .withName("Usuario Existente")
      .withEmail(testData.users.registered.email)
      .withPassword("Password123!")
      .withPhone("555-987-6543")
      .withAddress("456 Existing St")
      .build();

    await registerPage.fillSignupForm(user.name, user.email);
    await registerPage.submitRegistration();

    const alert = page.locator("text=Email Address already exist!");
    await expect(alert).toBeVisible();
    await expect(page).toHaveURL(/.*\/signup$/);
  });
});
