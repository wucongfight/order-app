import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {OrderDetail} from './entity/orderDetail';
import {Order} from './entity/order';
import {OrderItem} from './entity/OrderItem';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serviceUrl = `/orderItem/order`;

  constructor(private httpClient: HttpClient) {
  }

  // 获取列表数据
  getOrderList(orderType: number, searchOrder: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>('/orderItem/orders' + `/${orderType}/${searchOrder}`, httpOptions);
  }

  // 获取单个数据
  getOneUser(id: number) {
    return this.httpClient.get<OrderDetail>(this.serviceUrl + `/detail/${id}`, httpOptions);
  }

  // 添加一个订单
  addUser(user: Order) {
    return this.httpClient.post<Order>(this.serviceUrl, user, httpOptions);
  }

  // 删除一个订单
  deleteUser(id: number) {
    alert(id);
    return this.httpClient.delete(this.serviceUrl + `/delete/${id}`, httpOptions);
  }

  // 更新数据
  updateUser(user: Order) {
    return this.httpClient.put(this.serviceUrl, user, httpOptions);
  }

  //  查询订单项信息
  getOrderItem(id: number) {
    return this.httpClient.get<OrderItem>(this.serviceUrl + `/orderItem/${id}`, httpOptions);
  }
}
