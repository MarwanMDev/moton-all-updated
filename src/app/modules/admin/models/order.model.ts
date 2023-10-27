import { CartItemModel } from "./cart-item.model";

export interface OrderModel {
    _id: string;
    cartItems: CartItemModel [ ]; // Define the proper type here
    createdAt: string;
    isDelivered: boolean;
    isPaid: boolean;
    paymentMethodType: string;
    shippingPrice: number;
    taxPrice: number;
    totalOrderPrice: number;
    updatedAt: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      profileImage: string;
    };
}
