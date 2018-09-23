import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable()
export class LogoutService {

  tokenRevokeUrl = `${environment.apiUrl}/token/revoke`;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
