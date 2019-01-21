import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderItem} from '../entity/OrderItem';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],

})
export class OrderDetailComponent implements OnInit {
  orderItemList: OrderItem[];
  private id: string;

  constructor(private route: ActivatedRoute,
              private  service: OrderService
  ) {
  }

  ngOnInit(): void {
    const ad = {};
// @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getOneUser(this.id).subscribe(data => {
        this.orderItemList = data;
      }
    );
  }


}



