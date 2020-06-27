import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {

  br = CalendarioPtBr.pt_BR;
  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  msgConfirmaExclusao = '';
  msgExclusaoSucesso = '';

  @ViewChild('tabela', { static: true }) tabela;

  constructor(
    private lancamentoService: LancamentoService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.traduzirMensagens();
  }

  traduzirMensagens() {
    this.translateService.get('confirmDelete-msg').subscribe(res => {
      this.msgConfirmaExclusao = res
    })
    this.translateService.get('deleteEntrySuccess-msg').subscribe(res => {
      this.msgExclusaoSucesso = res
    })
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(retorno => {
        this.lancamentos = retorno.lancamentos;
        this.totalRegistros = retorno.total;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: this.msgConfirmaExclusao,
      accept: () => this.excluir(lancamento)
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        console.log('excluiu');
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: this.msgExclusaoSucesso });
      })
      .catch(erro => this.errorHandler.handler(erro));

  }
}
