import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  @Output()isQuite: EventEmitter<boolean>  = new EventEmitter();
  isRegister = false;
  isFlagOrder = false;
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  constructor() { }

  ngOnInit() {
  }
//  显示列表组件
  orderOpen() {
    this.isFlagOrder = true;
  }
  //  关闭显示列表组件
  orderClose() {
    this.isFlagOrder = false;
  }
  //  修改修改密码的标记
  updateFlag() {
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

  //  推出登录标记
  quite(): void {
    this.isQuite .emit(true);
  }
}
