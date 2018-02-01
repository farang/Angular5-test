import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from './../auth.service';
import { UserdataService } from './../userdata.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  public username: String = '';
  public password: string = '';
  public token: String = '';

  constructor(private auth: AuthService, public userdata: UserdataService, private _router: Router) { }

  ngOnInit() {
    this.resetCaptcha();
  }

  public resetCaptcha() {
    this.captcha.reset();
  }

  public handlCaptchaResponse(event) {
    this.token = this.captcha.getResponse();
  }

  public validationError(error: String) {
    alert(error);
    this.resetCaptcha();
  }

  private sendTokensData(xsrf, falcon){
    setTimeout(() => {
      this.auth.getUserStatus({
        "X-XSRF-TOKEN": xsrf,
        "X-FALCON-TOKEN": falcon,
      }).then((userStatus) => {
        this.userdata.setInfo(userStatus);
        this._router.navigate(['status']);
      }).catch((err) => {
        this.resetCaptcha();
        alert(err);
      });
    }, 1000);
  }

  public sendAuthData(data: any) {
    this.auth.send({
      "captcha": this.token,
      "username": this.username,
      "password_md5": Md5.hashStr(this.password)
    }).then((tokens) => {
      let xsrf = tokens.headers.get("x-xsrf-token"),
        falcon = tokens.headers.get("x-falcon-token");

      this.sendTokensData(xsrf, falcon);
    });
  }

  public checkAuthData() {
    let errorsString: String = '';

    if (this.token === '') {
      errorsString += 'Pass CAPTCHA sequrity.';
    }

    if (this.username.trim().length < 3) {
      errorsString += 'Login is too short.';
    }

    if (this.password.trim().length < 8) {
      errorsString += 'Password is too short.';
    }

    if (errorsString.trim().length > 0) {
      this.validationError(errorsString);
    } else {
      this.sendAuthData({
        login: this.username,
        password: this.password
      });
    }
  }
}
