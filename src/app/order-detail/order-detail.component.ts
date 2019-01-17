import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDetail} from '../entity/orderDetail';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],

})
export class OrderDetailComponent implements OnInit {
  orderDetail: OrderDetail;
  private id: number;

  constructor(private route: ActivatedRoute,
              private  service: OrderService
  ) {
  }

  ngOnInit(): void {
// @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getOneUser(this.id).subscribe(data => {
      this.orderDetail = data;
      if (this.orderDetail.orderItem === null || this.orderDetail.orderItemAmount === null ||
        this.orderDetail.orderItemPrice === null || this.orderDetail.orderItemProduct === null) {
        this.orderDetail = null;
      }
    });
  }


}



