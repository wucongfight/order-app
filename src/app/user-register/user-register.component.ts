import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServiceService} from '../user-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  validateForm: FormGroup;
  private serviceUrl = `/user/register`;

  constructor(private  fb: FormBuilder, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    alert(JSON.stringify(this.validateForm.value));
    this.httpClient.post(this.serviceUrl, this.validateForm.value, httpOptions).subscribe();
  }

}
