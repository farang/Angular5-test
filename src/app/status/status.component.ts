import { Component, OnInit } from '@angular/core';
import { UserdataService } from './../userdata.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  public pageData: any = {};
  public pageDataToShow: any = [];

  constructor(public userdata: UserdataService, private _router: Router) {
    this.pageData = this.userdata.userInfo.user;
    this.dataFormation(this.pageData);
    if (this.pageDataToShow.length === 0) {
      this._router.navigate(['auth']);
    }
  }

  ngOnInit() {

  }

  public dataFormation(pageData) {
    for (var i in pageData) {
      let value = pageData[i];

      if (!value || typeof value === 'string') {
        this.pageDataToShow.push({
          key: i,
          value: value
        });
      } else {
        this.dataFormation(value);
      }
    }
  }
}
