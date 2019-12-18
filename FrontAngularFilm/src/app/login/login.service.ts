
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Subject} from 'rxjs';

@Injectable()
export class LoginService {
  loggedIn: Subject<boolean>;
  adminIn: Subject<boolean>;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    this.loggedIn = new Subject();
    this.adminIn = new Subject();
    this.getLogin();
  }

  getUser(data) {
    this.http.post(`/api/login`, data,{
      withCredentials: true
    })
    .subscribe((res: any) => {
        if(res.role === 1)
        {
          this.adminIn.next(true);
        }
          this.loggedIn.next(true);
          this.toastr.success('You have been logged with success.', 'Success');
          this.router.navigateByUrl('/');
        },
        err => {
          this.loggedIn.next(false);
        //  this.adminIn.next(false);
          console.log('Error occured:' , err);
          this.toastr.error("Your username or password is incorrect", 'Error occured');
        }
      );
  }

  getLogin() {
    this.http.get( `/api/login`,{
        withCredentials: true
      }
    ).subscribe((res: any) => {
      this.loggedIn.next(res.loggedIn);
    }, (errorResp) => {
      this.toastr.error('Oops, something went wrong getting the logged in status')
    })
  }

  logout() {
    this.http.post( `/api/logout`,{},{
      withCredentials: true
    })
      .subscribe(() => {
      this.loggedIn.next(false);
      this.adminIn.next(false);
      });
  }
}
