import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';

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
  pessoas = [];
  // lancamento = new Lancamento();
  formulario: FormGroup;

  br = CalendarioPtBr.pt_BR;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }

  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
        this.messageService.add({ severity: 'success', summary: 'Lançamento adicionado com sucesso!' });

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);

        this.messageService.add({ severity: 'success', summary: 'Lançamento atualizado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handler(erro));
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

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo };
        });
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['lancamentos/novo']);
  }

}
