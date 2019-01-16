import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {AddFormComponent} from './add-form/add-form.component';
const routes: Routes = [
  {path: 'order', component: OrderComponent},
  {path: 'order-detail', component: OrderDetailComponent},
  {path: 'order-add', component: AddFormComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
