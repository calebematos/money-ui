import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cidades = [
    { label: 'Salvador', value: '2' },
    { label: 'Blumenau', value: '3' }
  ];
  estados = [
    { label: 'SC', value: '1' },
    { label: 'BA', value: '2' },
  ]
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {

  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Pessoa adicionada com sucesso!' });

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

}
