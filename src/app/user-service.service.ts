import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './entity/user';
const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private serviceUrl = `/user`;
  constructor(private httpClient: HttpClient) {
  }

  //  用户登录
  userLogin() {
  return this.httpClient.post(this.serviceUrl, User, httpOptions);
  }

  //  注册用户与修改密码

  register(user: any) {
    alert(user);
    return this.httpClient.post(this.serviceUrl, user, httpOptions);
  }

}
