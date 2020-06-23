import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;
  @ViewChild('tabela', { static: true }) tabela;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        this.pessoas = response.pessoas;
        this.totalRegistros = response.total;
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  aoMudarDePagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(pessoa)
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
          this.pesquisar();
        }
        this.messageService.add({ severity: 'success', summary: 'Pessoa excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  mudarStatus(pessoa: any) {
    this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo)
      .then(() => {
        pessoa.ativo = !pessoa.ativo;
        const status = pessoa.ativo ? 'ativada' : 'desativada';
        this.messageService.add({ severity: 'success', summary: `Pessoa ${status} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handler(erro));

  }

}
