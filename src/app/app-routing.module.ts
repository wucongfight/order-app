import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserServiceService} from './user-service.service';
const routes: Routes = [
  { path: 'user-login', component: UserServiceService},


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
