import {OrderItemAmount} from './orderItemAmount';
import {OrderItemPrice} from './orderItemPrice';
import {OrderItemProduct} from './orderItemProduct';

export class OrderItem {
  id: number;
  orderItemId: string;
  remark: string;
  sourceType: number;
  sourceId: string;
  createTime: string;
  productType: number;
  lastModifyTime: string;
  orderItemProductList: OrderItemProduct[];
  orderItemPriceList: OrderItemPrice[];
  orderItemAmountList: OrderItemAmount[];
}
