import { Component, OnInit } from '@angular/core';
import {RegisterService} from './register.service';
import {Register} from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: Register = {
    id_user: null,
    username: '',
    password: '',
    role: null,
    firstname: '',
    name: '',
    email: ''
  };

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  createUser(data: Register) {
    this.registerService.createUser(data);
  }

}
