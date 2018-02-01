import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(public http:Http) { }

  public send(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
		return this.http.post('https://api.amalyze.com/0.0.12/system.user.login', data, options)
			.toPromise()
			.then((res) => {
				return res;
			})
			.catch();
  }

  public getUserStatus(data: any) {
    let headers = new Headers(data);
    let options = new RequestOptions({ headers: headers });
    
		return this.http.post('https://api.amalyze.com/0.0.12/system.user.status', {}, options)
			.toPromise()
			.then(res => {
				return res.json();
			})
			.catch();
  }
}
