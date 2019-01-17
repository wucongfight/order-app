import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {OrderComponent} from './order/order.component';
import {AppRoutingModule} from './app-routing.module';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AddFormComponent} from './add-form/add-form.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {FirstPageComponent} from './first-page/first-page.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    OrderDetailComponent,
    OrderComponent,
    AppComponent,
    AddFormComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FirstPageComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, OrderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
