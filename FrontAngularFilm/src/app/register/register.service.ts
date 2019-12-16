
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:8000';
  getUser() {
    return this
      .http
      .get(`${this.url}/registers`);
  }

  createUser(data) {
    this.http.post(`${this.url}/registers`, data)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('You have been registered with success.', 'Success');
          this.router.navigateByUrl('/');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error("Username is already use, please choose an other", 'Error occured');
        }
      );
  }
}
