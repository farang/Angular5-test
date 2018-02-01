import { Injectable } from '@angular/core';

@Injectable()
export class UserdataService {

  constructor() {
  }

  public userInfo: any = {};

  public setInfo(userdata) {
    this.userInfo = userdata;
  }
}
