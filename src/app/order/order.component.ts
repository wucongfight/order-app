import {Component, OnInit} from '@angular/core';
import {Order} from '../entity/order';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {OrderService} from '../order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  allChecked: false;
  indeterminate = false;
  orderType = -1; // 订单类型
  [x: string]: any;

  order$: Observable<any>;
  listOrder: Order[] ; // 订单列表
  order: Order; //  订单对象
  _options = [{
    value: -1,
    label: '全部',
    isLeaf: true,
  },
    {
      value: 1,
      label: '已接单',
      isLeaf: true,
    },
    {
      value: 0,
      label: '未接单',
      isLeaf: true,
    }];
  private searchOrder = 0;
  private searchTerms = new Subject<string>();

  constructor(private service: OrderService) {
  }

  ngOnInit() {
    this.findOrderList(0, 0);
  }

// 全部删除
  deleteAll() {
  }


  refreshStatus(): void {
    // @ts-ignore
    const allChecked = this.listOrder.every(value => value.checked === true);
    const allUnChecked = this.listOrder.every(value => !value.checked);
    // @ts-ignore
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.listOrder.forEach(data => {
      // @ts-ignore
      data.checked = value;
    });
    this.refreshStatus();
  }

// 订单类型查询
  _console(value) {
    this.orderType = Number.parseInt(value, 10);
    this.findOrderList(this.orderType, this.searchOrder);
  }

  // 提交删除
  confirm(id: string) {
    this.delete(id);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchOrder = Number.parseInt(term, 10);
    this.searchTerms.next(term);
    this.searchShow();
  }

  searchShow(): void {
    // @ts-ignore
    this.order$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.service.getOrderList(this.orderType, Number.parseInt(term, 10))),
    ).subscribe(data => {
      this.listOrder = data;
    });
  }

  // 查询订单列表
  findOrderList(orderType: number, searchOrder: number): void {
    this.service.getOrderList(orderType, searchOrder).subscribe((data) => {
      this.listOrder = data;
    });
  }


  // 增加订单
  add(user: Order): void {
    this.service.addUser(user);
    this.findOrderList(0, 0);
  }

  // 删除订单
  // subscribe();如果忘了，将不会向服务器发送请求
  delete(id: string): void {
    this.service.deleteUser(id).subscribe();
    this.findOrderList(0, 0);
  }

  // 增加订单
  update(user: Order): void {
    this.service.updateUser(user);
    this.findOrderList(1, 0);
  }


}


