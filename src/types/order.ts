export type SalesChannel = "woocommerce" | "allegro";

export interface OrderLineDraft {
  sku: string;
  quantity: number;
  name?: string;
}

export interface OrderDraft {
  channel: SalesChannel;
  externalOrderId: string;
  shopOrderNumber: string;
  shipmentReceiver: string;
  requiredDate: string;
  orderComments?: string;
  customerNotes?: string;
  lines: OrderLineDraft[];
}
