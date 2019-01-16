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
  @Input() orderDetail: OrderDetail;

  constructor(
  ) {
  }

  ngOnInit(): void {

  }




}



