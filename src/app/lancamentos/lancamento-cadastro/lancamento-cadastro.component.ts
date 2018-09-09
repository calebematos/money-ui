import { Component, OnInit } from '@angular/core';

import { CalendarioPtBr } from './../../shared/Calendario-ptBr';

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

  categorias = [
    { label: 'Alimentação', value: '1' },
    { label: 'Transporte', value: '2' }
  ];

  pessoas = [
    { label: 'Joao', value: '1' },
    { label: 'Maria', value: '2' },
    { label: 'José', value: '3' },
  ];

  br = CalendarioPtBr.pt_BR;

  constructor() { }
  ngOnInit() {
  }

  salvar() {
  }

}
