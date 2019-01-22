import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderItem} from '../entity/OrderItem';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  private id: string;
  private validateForm: FormGroup;
  private orderItem: OrderItem;
  private serviceUrl = `/orderItem/order`;


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute,
              private orderService: OrderService, private router: Router) {

  }


  ngOnInit() {
    this.orderItem = new OrderItem();
    this.updateDetail();
    this.validateForm = this.fb.group({
      id: ['', [Validators.required]],
      orderItemId: ['', [Validators.required]],
      remark: [''],
      sourceType: ['', [Validators.required]],
      productType: [''],
      sourceId: ['', [Validators.required]],
      createTime: [''],
      lastModifyTime: [''],

    });
  }


  submitForm(): void {
    console.warn(this.validateForm.value);
    const orderItem = this.validateForm.value;
    this.httpClient.post(this.serviceUrl + `/add`, orderItem, httpOptions).subscribe();
    // 跳转到列表项
    this.router.navigate(['/order']);
  }

  updateDetail() {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    if ( this.id !== '0') {
      this.orderService.getOrderItem(this.id).subscribe(data => {
        this.orderItem = data;
      });
    }

  }

}
