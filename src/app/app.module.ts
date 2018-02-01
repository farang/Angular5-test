import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { StatusComponent } from './status/status.component';

import { AuthService } from './auth.service';
import { UserdataService } from './userdata.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthFormComponent },
  { path: 'status', component: StatusComponent },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReCaptchaModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthService, UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
