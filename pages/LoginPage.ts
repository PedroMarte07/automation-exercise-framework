import { Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage {
  private get loginForm() {
    return this.page.locator("form").filter({ hasText: "Login" });
  }

  get emailInput() {
    return this.loginForm.getByPlaceholder("Email Address");
  }

  get passwordInput() {
    return this.loginForm.getByPlaceholder("Password");
  }

  get loginButton() {
    return this.loginForm.getByRole("button", { name: "Login" });
  }

  get errorMessage() {
    return this.page.locator(
      "text=/Your email or password is incorrect!|invalid|incorrect/i",
    );
  }

  async goto(): Promise<void> {
    await this.page.goto("/login", { waitUntil: "load" });
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
