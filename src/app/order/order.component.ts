import {Component, Input, OnInit, Output} from '@angular/core';
import {Order} from '../entity/order';
import {PageInfo} from '../entity/pageInfo';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {OrderDetail} from '../entity/orderDetail';
import {ActivatedRoute} from '@angular/router';
import {OrderItem} from '../entity/OrderItem';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isDetail = false;
  detailId: number;
  isVisible = false; // 修改，增加弹框标记
  [x: string]: any;
  private detail: OrderItem;
  private searchOrder = 0;
  order$: Observable<any>;
  private searchTerms = new Subject<string>();
  listOrder: Order[]; // 订单列表
  listPage: PageInfo; // 订单
  order: Order; //  订单对象
  pageCount: number; // 总页数
  constructor(private service: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.findUserList(1, 0);

  }
//  改变标记状态，实现弹框
  addModal(): void {
    this.isVisible = true;
    this.detail  = null ;
  }
  updateModal(id: number): void {
    this.isVisible = true;
    this.getOrderDetail(id);
  }
  detailOpen(id: number): void {
    this.isDetail = true;
    this.detailId = id;

  }

  //  确认提交
  handleOk(): void {
    this.isVisible = false;
    this.isDetail = false;
  }
  //  取消弹框
  handleCancel(): void {
    this.isVisible = false;
    this.isDetail = false;
  }

  //  改变isFlagOrderDetail 的Boolean值
  orderDetailOpen(id: number) {
    alert(id);
    this.listPage = null;

  }

  getOrderDetail(id: number): void {
    alert(id);
    this.service.getOrdeItemr(id)
      .subscribe(data => {
        this.detail = data;
      });
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
      switchMap((term: string) => this.service.searchOrder(term)),
    ).subscribe(data => {
      if (null !== data) {
        this.listPage = data;
        this.listOrder = this.listPage.list;
        this.pageCount = this.listPage.total / this.listPage.pageSize;

      } else {
        alert('输入有误，请重新输入！');
      }
    });
  }

  // 查询订单列表
  findUserList(pageNum: number, searchOrder: number): void {
    this.service.getUserList(pageNum, searchOrder).subscribe((data) => {
      alert(JSON.stringify(data));
      this.listPage = data;
      this.listOrder = this.listPage.list;
      this.pageCount = this.listPage.total / this.listPage.pageSize;
    });
  }

  findOrders(pageNum: number): void {
    if (pageNum < 1) {
      pageNum = 1;
    }
    if (pageNum > this.listPage.total) {
      pageNum = this.listPage.total;
    }
    alert(this.searchOrder);
    if (this.searchOrder == null || isNaN(this.searchOrder)) {
      this.searchOrder = 0;
    }
    this.findUserList(pageNum, this.searchOrder);
  }

  // 增加订单
  add(user: Order): void {
    this.service.addUser(user);
    this.findUserList(1, 0);
  }

  // 删除订单
  // subscribe();如果忘了，将不会向服务器发送请求
  delete(id: number): void {
    this.service.deleteUser(id).subscribe();
    this.findUserList(1, 0);
  }

  // 增加订单
  update(user: Order): void {
    this.service.updateUser(user);
    this.findUserList(1, 0);
  }
  // 消息确认按钮
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(id: number): void {
    this.nzMessageService.info('click confirm');
    this.delete(id);
  }


}


