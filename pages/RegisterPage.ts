import { BasePage } from "./base/BasePage";
import { User } from "../builders/UserBuilders";

export class RegisterPage extends BasePage {
  private get signupForm() {
    return this.page.locator("form").filter({ hasText: "Signup" });
  }

  get nameInput() {
    return this.signupForm.getByPlaceholder("Name");
  }

  get emailInput() {
    return this.signupForm.getByPlaceholder("Email Address");
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get firstNameInput() {
    return this.page.locator('input[name="first_name"]');
  }

  get lastNameInput() {
    return this.page.locator('input[name="last_name"]');
  }

  get addressInput() {
    return this.page.locator('input[name="address1"]');
  }

  get countryInput() {
    return this.page.locator('select[name="country"]');
  }

  get stateInput() {
    return this.page.locator('input[name="state"]');
  }

  get cityInput() {
    return this.page.locator('input[name="city"]');
  }

  get zipcodeInput() {
    return this.page.locator('input[name="zipcode"]');
  }

  get mobileNumberInput() {
    return this.page.locator('input[name="mobile_number"]');
  }

  get submitButton() {
    return this.signupForm.getByRole("button", {
      name: /Signup|Sign Up/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
    await this.waitForPageLoad();
  }

  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async fillAccountInfo(userData: User): Promise<void> {
    const [firstName, lastName] = userData.name.split(" ");
    await this.passwordInput.fill(userData.password);
    await this.firstNameInput.fill(firstName ?? userData.name);
    await this.lastNameInput.fill(lastName ?? "");
    await this.addressInput.fill(userData.address);
    await this.countryInput.selectOption({
      label: userData.country ?? "United States",
    });
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipcode);
    await this.mobileNumberInput.fill(userData.phone);
  }

  async submitRegistration(): Promise<void> {
    await this.submitButton.click();
    const duplicateEmailAlert = this.page.locator(
      "text=Email Address already exist!",
    );

    await Promise.any([
      this.firstNameInput.waitFor({ state: "visible", timeout: 10000 }),
      duplicateEmailAlert.waitFor({ state: "visible", timeout: 10000 }),
    ]);
  }

  get createAccountButton() {
    return this.page.getByRole("button", { name: /Create Account/i });
  }

  get continueButton() {
    return this.page.locator('a:has-text("Continue")');
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
    await this.continueButton.first().waitFor({
      state: "visible",
      timeout: 15000,
    });
    await this.continueButton.first().click();
    await this.waitForPageLoad();
  }
}
