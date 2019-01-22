import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
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

  // 获取订单项数据
  getOneUser(id: String) {
    return this.httpClient.get<OrderItem[]>(this.serviceUrl + `/detail/${id}`, httpOptions);
  }

  // 添加一个订单
  addUser(user: Order) {
    return this.httpClient.post<Order>(this.serviceUrl, user, httpOptions);
  }

  // 删除一个订单
  deleteUser(ids: string[]) {
    return this.httpClient.delete(this.serviceUrl + `/delete/${ids}`, httpOptions);
  }

  // 更新数据
  updateUser(user: Order) {
    return this.httpClient.put(this.serviceUrl, user, httpOptions);
  }

  //  查询订单项信息
  getOrderItem(id: string) {
    return this.httpClient.get<OrderItem>(this.serviceUrl + `/orderItem/${id}`, httpOptions);
  }
}
