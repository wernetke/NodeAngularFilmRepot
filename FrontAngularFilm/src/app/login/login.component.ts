import { Component, OnInit } from '@angular/core';
import {Login} from "../login/login.interface";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  getUser(data: Login) {
    this.loginService.getUser(data);
  }

}
