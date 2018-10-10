import { Injectable } from '@angular/core';

import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable()
export class LogoutService {

  tokenRevokeUrl = `${environment.apiUrl}/token/revoke`;

  constructor(
    private http: MoneyHttp,
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
