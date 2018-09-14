import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  br = CalendarioPtBr.pt_BR;
  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') tabela;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(retorno => {
        this.lancamentos = retorno.lancamentos;
        this.totalRegistros = retorno.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
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
        this.messageService.add({ severity: 'success', summary: 'Lançamento excluído com sucesso!' });
      });

  }
}
