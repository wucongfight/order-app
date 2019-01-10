import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {PageInfo} from './entity/pageInfo';
import {OrderDetail} from './entity/orderDetail';
import {Order} from './entity/order';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';
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
  getUserList(pageNu: number, searchOrder: number): Observable<PageInfo> {
    return this.httpClient.get<PageInfo>(/*'/api/orderItem/order'*/ this.serviceUrl + `/${pageNu}/${searchOrder}`, httpOptions);
  }

  // 获取单个数据
  getOneUser(id: number)/*: Observable<OrderDetail> */ {
    return this.httpClient.get<OrderDetail>( /*'/api/orderItem/order/detail/'*/ this.serviceUrl +  `/detail/${id}`, httpOptions);
  }

  // 添加一个订单
  addUser(user: Order)/*: Observable<Order> */{
    return this.httpClient.post<Order>( /*'/api/orderItem/order '*/this.serviceUrl, user, httpOptions);
  }

  // 删除一个订单
  deleteUser(id: number)/*: Observable<Order> */ {
    alert(id);
    return this.httpClient.delete(this.serviceUrl + `/delete/${id}`, httpOptions);
  }
  // 更新数据
  updateUser(user: Order )/*: Observable<any>*/ {
    return this.httpClient.put( /*'/api/orderItem/order'*/this.serviceUrl , user, httpOptions);
  }

  // 搜索
  searchOrder(term: string): Observable<PageInfo> {
    if (term.trim()) {
      if (term == null || isNaN(Number.parseInt(term, 10))) {
        term = '0';
      }
      return this.httpClient.get<PageInfo>(/*`/api/orderItem/order/?cityId=${term}`*/this.serviceUrl + `/1/${Number.parseInt(term, 10)}`);
    } else {
      return of();
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  //  查询订单项信息
  getOrdeItemr(id: number) {
    return this.httpClient.get<OrderItem>( this.serviceUrl +  `/orderItem/${id}`, httpOptions);
  }
}
