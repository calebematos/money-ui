import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

  salvar() {
  }

}
