import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  authTokenUrl = `${environment.apiUrl}/oauth/token`;

  constructor(private http: Http) { }

  login(usuario: string, senha: string): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.authTokenUrl, body, { headers })
      .toPromise()
      .then(response => console.log(response))
      .catch(response => console.log(response));

  }


}
