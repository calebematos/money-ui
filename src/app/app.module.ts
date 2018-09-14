import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MessageService } from 'primeng/components/common/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ToastModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
