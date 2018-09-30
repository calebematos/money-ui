import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from '../relatorios.service';
import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  br = CalendarioPtBr.pt_BR;

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.gerarRelatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(response => {
        const url = window.URL.createObjectURL(response);

        window.open(url);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
