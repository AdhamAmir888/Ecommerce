import { ProductType } from "./products.t";

export interface OrderItemType {
  _id: string;
  count: number;
  price: number;
  product: Pick<ProductType, "_id" | "title" | "imageCover">;
}

export interface OrderType {
  _id: string;
  id: number;
  shippingAddress: { details: string; phone: string; city: string };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderItemType[];
  createdAt: string;
  updatedAt: string;
}