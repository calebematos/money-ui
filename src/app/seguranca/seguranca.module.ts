import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';

import { ButtonModule } from 'primeng/button';
import { JwtModule } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/inputtext';

import { MoneyHttp } from './money-http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';
import { environment } from './../../environments/environment';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),

    InputTextModule,
    ButtonModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
