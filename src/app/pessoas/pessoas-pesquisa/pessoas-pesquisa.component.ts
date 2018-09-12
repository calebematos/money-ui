import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        this.pessoas = response.pessoas;
        this.totalRegistros = response.total;
      });
  }

  aoMudarDePagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
