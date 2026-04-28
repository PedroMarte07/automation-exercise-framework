import { Locator } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class CartPage extends BasePage {
  get cartItems(): Locator {
    return this.page.locator(
      ":scope >> .cart_item, :scope >> .cart-item, :scope >> table tbody tr",
    );
  }

  get proceedToCheckoutButton(): Locator {
    return this.page.locator("a.check_out").first();
  }

  async goto(): Promise<void> {
    await this.page.goto("/view_cart");
    await this.waitForPageLoad();
  }

  async getCartCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async hasProduct(productName: string): Promise<boolean> {
    return (
      (await this.page
        .locator(".table-responsive table tbody tr", {
          hasText: productName,
        })
        .count()) > 0
    );
  }

  async removeItem(productName: string): Promise<void> {
    const itemRow = this.page
      .locator(".table-responsive table tbody tr", {
        hasText: productName,
      })
      .first();
    await itemRow.locator("a.cart_quantity_delete").first().click();
    await this.page.waitForSelector(
      `.table-responsive table tbody tr:has-text("${productName}")`,
      { state: "detached", timeout: 10000 },
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
