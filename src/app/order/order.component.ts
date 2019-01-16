import {Component, Input, OnInit, Output} from '@angular/core';
import {Order} from '../entity/order';
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
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _indeterminate = false;


  isOpen = false;  //  组件是否显示
  isOrder = false; // 列表是否有数据的标志
  orderType = 0; // 订单类型
  isDetail = false;
  detailOrder: OrderDetail;
  isVisible = false; // 修改，增加弹框标记
  [x: string]: any;

  order$: Observable<any>;
  listOrder: Order[]; // 订单列表
  order: Order; //  订单对象
  _options = [{
    value: 0,
    label: '全部',
    isLeaf: true,
  },
    {
      value: 1,
      label: '已接单',
      isLeaf: true,
    },
    {
      value: 2,
      label: '未接单',
      isLeaf: true,
    }];
  private detail: OrderItem;
  private searchOrder = 0;
  private searchTerms = new Subject<string>();

  constructor(private service: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.findOrderList(0, 0);

  }

  // 删除全部
  deleteAll() {
    alert(1243);
  }

// 订单类型查询
  _console(value) {
    this.orderType = Number.parseInt(value, 10);
    this.findOrderList(this.orderType, this.searchOrder);
  }

//  改变标记状态，实现弹框
  addModal(): void {
    this.isVisible = true;
    this.detail = null;
    this.isOpen = true;
  }

  updateModal(id: number): void {
    this.isVisible = true;
    this.getOrderDetail(id);
    this.isOpen = true;
  }

  detailOpen(id: number): void {
    this.isDetail = true;
    this.service.getOneUser(id).subscribe(data => {
      this.detailOrder = data;
    });
    this.isOpen = true;

  }

  //  确认提交
  handleOk(): void {
    this.isVisible = false;
    this.isDetail = false;
    this.isOpen = false;
    this.detailOrder = null;
  }

  //  取消弹框
  handleCancel(): void {
    this.isVisible = false;
    this.isDetail = false;
    this.isOpen = false;
    this.detailOrder = null;
  }


  getOrderDetail(id: number): void {
    this.service.getOrderItem(id)
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
      switchMap((term: string) => this.service.getOrderList(this.orderType, Number.parseInt(term, 10))),
    ).subscribe(data => {
      this.listOrder = data;
      if (data == null) {
        this.isOrder = true;
      }
    });
  }

  // 查询订单列表
  findOrderList(orderType: number, searchOrder: number): void {
    this.service.getOrderList(orderType, searchOrder).subscribe((data) => {
      this.listOrder = data;
      if (data == null) {
        this.isOrder = true;
      }
    });
  }


  // 增加订单
  add(user: Order): void {
    this.service.addUser(user);
    this.findOrderList(0, 0);
  }

  // 删除订单
  // subscribe();如果忘了，将不会向服务器发送请求
  delete(id: number): void {
    this.service.deleteUser(id).subscribe();
    this.findOrderList(0, 0);
  }

  // 增加订单
  update(user: Order): void {
    this.service.updateUser(user);
    this.findOrderList(1, 0);
  }

  // 消息确认按钮
  /*cancel(): void {
  }*/

  confirm(id: number): void {
    this.listOrder = null;
    this.delete(id);
  }


  _displayDataChange($event) {
    this._displayData = $event;
  }

  /*_refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }*/

  /* _checkAll(value) {
     if (value) {
       this._displayData.forEach(data => data.checked = true);
     } else {
       this._displayData.forEach(data => data.checked = false);
     }
     this._refreshStatus();
   }

   _operateData() {
     this._operating = true;
     setTimeout(_ => {
       this._dataSet.forEach(value => value.checked = false);
       this._refreshStatus();
       this._operating = false;
     }, 1000);
   }
 */


}


