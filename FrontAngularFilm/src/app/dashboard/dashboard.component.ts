import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {SessionService} from "../session/session.service";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loggedIn;
  accountBalance;
  constructor(private breakpointObserver: BreakpointObserver,private loginService: LoginService,
              private SessionService: SessionService) {
    this.loginService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.SessionService.accountBalance.subscribe(balance => {
      this.accountBalance = balance;
    });
  }

  doLogout() {
    this.loginService.logout();
  }


  getBalance() {
    this.SessionService.getAccountBalance();
  }

}
