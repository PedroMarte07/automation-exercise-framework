import { test, expect } from "../../fixtures/auth.fixture";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { testData } from "../../data/testData";

test.describe("Carrito", () => {
  test("agregar producto al carrito", async ({ authenticatedPage }) => {
    const productsPage = new ProductsPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);

    await productsPage.goto();
    await productsPage.addToCartByName(testData.products.first);
    await cartPage.goto();

    await expect(await cartPage.getCartCount()).toBe(1);
    await expect(await cartPage.hasProduct(testData.products.first)).toBe(true);
  });

  test("eliminar producto del carrito", async ({ authenticatedPage }) => {
    const productsPage = new ProductsPage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);

    await productsPage.goto();
    await productsPage.addToCartByName(testData.products.second);
    await cartPage.goto();
    await cartPage.removeItem(testData.products.second);

    await expect(await cartPage.getCartCount()).toBe(0);
  });
});
