import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDetail} from '../entity/orderDetail';
import {OrderService} from '../order.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderItem} from '../entity/OrderItem';
const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
 @Output() isFlag: true;
  validateForm: FormGroup;
  private route: ActivatedRoute;
  private service: OrderService;
  @Input()  orderItem: OrderItem;
  private serviceUrl = `/orderItem/order`;
  private  id: number;


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {

  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      id: ['', [ Validators.required ]],
      orderid: ['', [ Validators.required ]],
      remark: ['', [ Validators.required ]],
      sourcetype: [''],
      producttype: [''],      sourceId: [''],
      createtime: [''],

      lastmodifytime: [''],

    });
  }


  submitForm(): void {
    console.warn(this.validateForm.value);
    const  orderItem = this.validateForm.value;
    this.httpClient.post(this.serviceUrl + `/add`, orderItem, httpOptions).subscribe();
    this.isFlag = true;

  }





}
