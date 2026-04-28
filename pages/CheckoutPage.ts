import { BasePage } from "./base/BasePage";
import { Page, Locator } from "@playwright/test";

export interface CardData {
  name: string;
  number: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class CheckoutPage extends BasePage {
  get commentBox(): Locator {
    return this.page.locator('textarea[name="message"]');
  }

  get placeOrderButton(): Locator {
    return this.page.locator('a:has-text("Place Order")').first();
  }

  get cardName(): Locator {
    return this.page.locator('input[name="name_on_card"]');
  }

  get cardNumber(): Locator {
    return this.page.locator('input[name="card_number"]');
  }

  get cvc(): Locator {
    return this.page.locator('input[name="cvc"]');
  }

  get expiryMonth(): Locator {
    return this.page.locator('input[name="expiry_month"]');
  }

  get expiryYear(): Locator {
    return this.page.locator('input[name="expiry_year"]');
  }

  get confirmOrderButton(): Locator {
    return this.page.getByRole("button", { name: /Pay and Confirm Order/i });
  }

  get successMessage(): Locator {
    return this.page.locator("text=Order Placed!");
  }

  async fillComment(text: string): Promise<void> {
    await this.commentBox.fill(text);
  }

  async fillPaymentDetails(cardData: CardData): Promise<void> {
    await this.cardName.fill(cardData.name);
    await this.cardNumber.fill(cardData.number);
    await this.cvc.fill(cardData.cvc);
    await this.expiryMonth.fill(cardData.expiryMonth);
    await this.expiryYear.fill(cardData.expiryYear);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
    await this.page.waitForURL(/.*\/payment/, { timeout: 10000 });
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
