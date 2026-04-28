import { Locator } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export class ProductsPage extends BasePage {
  get cartBadge(): Locator {
    return this.page.locator(
      '.cart-badge, .badge, [data-test-id="cart-badge"]',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto("/products");
    await this.waitForPageLoad();
  }

  async addToCartByName(productName: string): Promise<void> {
    const productCard = this.page
      .locator(".features_items .product-image-wrapper", {
        hasText: productName,
      })
      .first();

    await productCard.locator("a.add-to-cart").first().click();
    await this.page.locator("h4.modal-title", { hasText: "Added!" }).waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.page
      .locator('a[href="/view_cart"]', { hasText: "View Cart" })
      .waitFor({
        state: "visible",
        timeout: 10000,
      });
  }
}
