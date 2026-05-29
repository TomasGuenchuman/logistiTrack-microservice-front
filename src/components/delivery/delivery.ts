export type DeliveryTab = "pending" | "inTransit" | "delivered";

export type Delivery = {
  id: string;
  code: string;
  address: string;
  detail: string;
  eta?: string;
  client: string;
  deliveredAt?: string;
};