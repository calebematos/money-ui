import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.auth.limparAccessToken();
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then(() => this.router.navigate(['/mymoney/dashboard']) )
    .catch(erro => this.errorHandler.handler(erro));
  }

}
