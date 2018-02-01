import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(public http:Http) { }

  public send(data: any) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, "withCredentials": true });
    console.log(data)
		return this.http.post('https://api.amalyze.com/0.0.12/system.user.login', data, options)
			.toPromise()
			.then((res) => {
				//debugger
				return res;
			})
			.catch();
  }

  public getUserStatus(data: any) {
		data['Content-Type'] = 'text/plain';
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
