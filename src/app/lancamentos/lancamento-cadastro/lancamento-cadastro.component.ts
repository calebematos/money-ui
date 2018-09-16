import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {


  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [
    { label: 'Joao', value: '1' },
    { label: 'Maria', value: '2' },
    { label: 'José', value: '3' },
  ];

  br = CalendarioPtBr.pt_BR;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  salvar() {
  }

}
