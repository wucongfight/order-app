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
  detail: OrderDetail[];
  orderDetail: OrderDetail;
  private id: number;

  constructor(private route: ActivatedRoute,
              private  service: OrderService
  ) {
  }

  ngOnInit(): void {
    const  ad = {};
// @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getOneUser(this.id).subscribe(data => {
        this.orderDetail = data;
this.detail = [this.orderDetail];
      }
    );
  }


}



