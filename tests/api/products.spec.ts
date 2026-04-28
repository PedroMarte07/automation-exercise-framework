import { test, expect, APIRequestContext } from "@playwright/test";
import { testData } from "../../data/testData";

test.describe("API Products", () => {
  test("GET /api/productsList retorna lista de productos", async ({
    request,
  }) => {
    const response = await request.get("/api/productsList");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test("POST /api/searchProduct retorna resultados", async ({ request }) => {
    const response = await request.post("/api/searchProduct", {
      form: {
        search_product: "top",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  test("POST /api/verifyLogin con credenciales válidas", async ({
    request,
  }) => {
    const response = await request.post("/api/verifyLogin", {
      form: {
        email: testData.users.registered.email,
        password: testData.users.registered.password,
      },
    });

    expect(response.status()).toBe(200);
  });
});
