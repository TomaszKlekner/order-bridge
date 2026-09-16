import { env } from "../config/env.js";
import type {
  CreateClientOrderRequest,
  CreateOrderResponse,
} from "../types/orderApi.js";

export class OrderApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "OrderApiError";
    this.status = status;
    this.body = body;
  }
}

export async function createClientOrder(
  request: CreateClientOrderRequest,
): Promise<CreateOrderResponse> {
  const baseUrl = env.TOYA_API_BASE_URL.replace(/\/$/, "");
  const url = `${baseUrl}/Orders/CreateClientOrder`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key-order": env.TOYA_API_KEY_ORDER,
    },
    body: JSON.stringify(request),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new OrderApiError(
      `Order API error ${response.status}: ${text || response.statusText}`,
      response.status,
      text,
    );
  }

  if (!text) {
    return {};
  }

  return JSON.parse(text) as CreateOrderResponse;
}
