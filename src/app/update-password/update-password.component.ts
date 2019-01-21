import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  validateForm: FormGroup;
  private serviceUrl = `/user`;

  constructor(private  fb: FormBuilder, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      nowPassword: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    alert(JSON.stringify(this.validateForm.value));
    this.httpClient.put(this.serviceUrl, this.validateForm.value).subscribe();
  }

}
