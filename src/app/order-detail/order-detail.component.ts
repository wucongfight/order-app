import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OrderDetail} from '../entity/orderDetail';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [OrderDetail]
})
export class OrderDetailComponent implements OnInit {
  title = 'order-detail';
  @Input() orderDetailId: number;

  constructor(
    private route: ActivatedRoute,
    private service: OrderService,
    private orderDetail: OrderDetail,
  ) {
  }

  ngOnInit(): void {
    this.getOrderDetail(this.orderDetailId);
  }

  getOrderDetail(id: number): void {

    this.service.getOneUser(1)
      .subscribe(data => {
        return this.orderDetail = data;
      });
  }


}



