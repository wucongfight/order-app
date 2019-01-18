import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `<app-user-login *ngIf="isLogin" (isLogin)="updateState($event)"></app-user-login>
  <app-first-page *ngIf="isIf" (isQuite)="quite($event)"></app-first-page>`
  ,
  styles: []
})
export class AppComponent {
  isLogin = true; //  登录应用是否销毁的标记
  isIf = false; //  用户登录是否成功的标记

//  修改密码时修该标记
  updateState(flag: boolean) {
    this.isIf = flag;
    this.isLogin = false;
  }

  //  退出登录标记
  quite(flag: boolean): void {
    this.isLogin = flag;
    this.isIf = false;
  }
}




