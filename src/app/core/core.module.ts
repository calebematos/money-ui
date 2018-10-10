import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { CategoriaService } from '../categorias/categoria.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { RelatoriosService } from '../relatorios/relatorios.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PaginaNaoEncotradaComponent } from './pagina-nao-encotrada.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncotradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ErrorHandlerService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    AuthService,
    MoneyHttp,

    JwtHelperService,
    MessageService,
    ConfirmationService,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
