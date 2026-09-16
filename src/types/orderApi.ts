export interface MaterialRequest {
  materialName: string;
  quantity: number;
  itemNumber: number;
}

export interface CreateClientOrderRequest {
  purchaserLogin: string;
  shipmentReceiver: string;
  requiredDate: string;
  shopOrderNumber: string;
  orderComments?: string;
  customerNotes?: string;
  materials: MaterialRequest[];
}

export interface OrderOutDetail {
  product?: string;
  quantity?: number;
}

export interface CreateClientOrderResult {
  success?: boolean;
  number?: string;
  items?: OrderOutDetail[];
  messages?: string[];
}

export interface CreateOrderResponse {
  results?: CreateClientOrderResult[];
}
