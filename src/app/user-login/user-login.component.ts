import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  private url = '/user/login';
  validateForm: FormGroup;
  isRegister = false; // 弹窗标记
  @Output() isLogin: EventEmitter<boolean> = new EventEmitter();


  // 提交表单
  submitForm(): void {
    alert(JSON.stringify(this.validateForm.value));
    this.httpClient.post<boolean>(this.url, this.validateForm.value, httpOptions).subscribe(data => {
      // 子组件向父组件传递消息
      this.isLogin.emit(data);
    });
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  //  修改标记
  updateFlag(): void {
    this.isRegister = true;
  }

  //  确认提交
  handleOk(): void {
    this.isRegister = false;
  }

  //  取消弹框
  handleCancel(): void {
    this.isRegister = false;

  }

}
