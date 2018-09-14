import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MessageService } from 'primeng/components/common/api';
import { ToastModule } from 'primeng/toast';

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
    PessoasModule

  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
