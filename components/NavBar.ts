import { Page, Locator } from "@playwright/test";

export class NavBar {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartLink(): Locator {
    return this.page.getByRole("link", { name: /cart/i });
  }

  get logoutLink(): Locator {
    return this.page.getByRole("link", { name: /logout/i });
  }

  get loggedInText(): Locator {
    return this.page.locator("text=Logged in as");
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.loggedInText.isVisible();
  }
}
