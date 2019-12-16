
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:8000';
  getUser(data) {
    this.http.post(`${this.url}/registers/login`, data)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('You have been logged with success.', 'Success');
          this.router.navigateByUrl('/');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error("Your username or password is incorrect", 'Error occured');
        }
      );
  }
}
