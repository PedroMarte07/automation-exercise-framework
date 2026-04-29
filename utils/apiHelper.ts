import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllProducts(): Promise<any> {
    const response = await this.request.get("/api/productsList");
    return await response.json();
  }

  async getUserByEmail(email: string): Promise<any> {
    const response = await this.request.get(
      `/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`,
    );
    return await response.json();
  }

  async verifyLogin(email: string, password: string): Promise<boolean> {
    const response = await this.request.post("/api/verifyLogin", {
      form: {
        email,
        password,
      },
    });
    const body = await response.json();
    return response.status() === 200 && body.responseCode === 200;
  }
}
