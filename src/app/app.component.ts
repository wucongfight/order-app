import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nz-header>
      <div style="background: #002140"></div>
      <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;text-align: center;">
        <li nz-menu-item style="font-size: 50px;color: aqua">后台管理系统</li>
      </ul>
      <div style="text-align: right">  <nz-badge [nzCount]="5" style="margin-right: 24px;">
        <nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar>
      </nz-badge></div>
    </nz-header>
    <nz-layout>
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzWidth]="width" [nzReverseArrow]="isReverseArrow">
        <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
          <li nz-submenu>
            <span title><i class="anticon anticon-user"></i><span class="nav-text"><span (click)="orderClose()">订单管理</span></span></span>
            <ul>
              <li nz-menu-item> <span (click)="orderOpen()">订单列表</span></li>
            </ul>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header style="background: #595959; padding:0;"></nz-header>
        <nz-content style="margin:0 16px;">
          <nz-breadcrumb style="margin:16px 0;">
            <nz-breadcrumb-item>User</nz-breadcrumb-item>
            <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
          </nz-breadcrumb>
          <div style="padding:24px; background: #fff; min-height: 360px;" >
            <app-order *ngIf="isFlagOrder"></app-order>
          </div>
        </nz-content>
        <nz-footer style="text-align: center;">Ant Design ©2017 Implement By Angular</nz-footer>
      </nz-layout>
    </nz-layout>
  `,
  styles  : [
    `
      :host ::ng-deep .logo {
        height: 32px;
        background: rgba(188, 100, 255, 0.2);
        margin: 16px;
      }

      .term {
        width: 100px;
        height: 30px;
        background: peachpuff;
      }
    `
  ]
})
export class AppComponent {
  isFlagOrderDetail = false;
  isFlagOrder = false;
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;

   orderOpen() {
   this.isFlagOrder = true;
  }
  orderClose() {
    this.isFlagOrder = false;

  }




  /*  getOrders() {
  this.orderService.getUserList(1, 0).subscribe(data => {
      this.pageInfo = data ;
  });
    }
  }*/
}
