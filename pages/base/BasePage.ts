import { Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
