import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {LoginService} from '../login/login.service';
import {Subject} from 'rxjs';

interface Balance {
  balance: number
}

@Injectable()
export class SessionService {


  accountBalance: Subject<Balance | null>;

  getAccountBalance() {
    const req = this.http.get( `/api/balance`, {
      withCredentials: true
    });
    req.subscribe((balance: Balance) => {
      this.accountBalance.next(balance);
    }, errorResp => {
      if (errorResp.status === 403) {
        // TODO: redirect to login
      }
      this.toastr.error(errorResp.error && errorResp.error.errorMessage ?
        errorResp.error.errorMessage :  'Oops, something went wrong.');
    });
  }


  constructor(private http: HttpClient,
              private LoginService: LoginService,
              private toastr: ToastrService) {
    this.accountBalance = new Subject();
    this.LoginService.loggedIn.subscribe(() => {
      this.accountBalance.next(null);
    });
  }
}
