import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Contato } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  indiceContato: number;
  exibindoFormularioContato = false;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.contato = new Contato();
    this.exibindoFormularioContato = true;
    this.indiceContato = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, indice: number) {
    this.contato = { ...contato };
    this.exibindoFormularioContato = true;
    this.indiceContato = indice;
  }

  confirmarContato(formContato: FormControl) {
    const contatoClone = { ...this.contato };
    this.contatos[this.indiceContato] = (contatoClone);
    this.exibindoFormularioContato = false;

    formContato.reset();
  }

  removerContato(indice: number) {
    this.contatos.splice(indice, 1);
  }

  get editando() {
    return Boolean(this.contato && this.contato.codigo);
  }


}
