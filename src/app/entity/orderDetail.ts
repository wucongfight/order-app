import {OrderItem} from './OrderItem';
import {OrderItemPrice} from './orderItemPrice';
import {OrderItemAmount} from './orderItemAmount';
import {OrderItemProduct} from './orderItemProduct';

export class OrderDetail {
  orderItem: OrderItem;
  orderItemPrice: OrderItemPrice;
  orderItemAmount: OrderItemAmount;
  orderItemProduct: OrderItemProduct;
}
