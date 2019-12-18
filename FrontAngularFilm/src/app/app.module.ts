import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import {RegisterService} from "./register/register.service";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { StorageServiceModule} from 'angular-webstorage-service';
import { LoginComponent } from './login/login.component';
import {LoginService} from "./login/login.service";
import { SessionComponent } from './session/session.component';
import {SessionService} from "./session/session.service";
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    SessionComponent,
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    RegisterService,
    LoginService,
    SessionService,
    BnNgIdleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
