import { test, expect } from "../../fixtures/auth.fixture";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage, CardData } from "../../pages/CheckoutPage";
import { testData } from "../../data/testData";

test("flujo E2E completo de checkout", async ({ authenticatedPage }) => {
  await authenticatedPage.goto("/");

  const productsPage = new ProductsPage(authenticatedPage);
  const cartPage = new CartPage(authenticatedPage);
  const checkoutPage = new CheckoutPage(authenticatedPage);

  await productsPage.goto();
  await productsPage.addToCartByName(testData.products.first);
  await cartPage.goto();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillComment("Please deliver between 9 AM and 5 PM");

  await checkoutPage.placeOrder();

  const cardData: CardData = {
    name: "Test User",
    number: "4242424242424242",
    cvc: "123",
    expiryMonth: "12",
    expiryYear: "2030",
  };

  await checkoutPage.fillPaymentDetails(cardData);
  await checkoutPage.confirmOrder();

  await expect(checkoutPage.successMessage).toBeVisible();
});
