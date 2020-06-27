import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { Lancamento } from '../../core/model';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { CalendarioPtBr } from './../../shared/Calendario-ptBr';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [];
  categorias = [];
  pessoas = [];
  formulario: FormGroup;
  labelReceita = "";
  labelDespesa = "";
  labelRecebimento = "";
  labelPagamento = "";
  msgLancamentoCriado = '';
  msgLancamentoAtualizado = '';

  br = CalendarioPtBr.pt_BR;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.traduzirMensagens();
    this.carregarCategorias();
    this.carregarPessoas();
    this.carregarTipos();
  }

  traduzirMensagens() {
    this.translateService.get('revenue-label').subscribe(res => {
      this.labelReceita = res;
      console.log(res)
    });
    this.translateService.get('expense-label').subscribe(res => {
      this.labelDespesa = res;
    });
    this.translateService.get('newEntrySuccess-msg').subscribe(res => {
      this.msgLancamentoCriado = res;
    });
    this.translateService.get('msg-update-entry-success').subscribe(res => {
      this.msgLancamentoAtualizado = res;
    });

    this.translateService.get('receivement-label').subscribe(res => {
      this.labelRecebimento = res;
    });
    this.translateService.get('payment-label').subscribe(res => {
      this.labelPagamento = res;
    });
  }

  carregarTipos() {
    this.tipos = [
      { label: this.labelReceita, value: 'RECEITA' },
      { label: this.labelDespesa, value: 'DESPESA' }
    ]
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
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

  validarObrigatoriedade(input: FormControl) {
    return input.value ? null : { obrigatoriedade: true };
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return !input.value || input.value.length >= valor ? null : { tamanhoMinimo: { tamanho: valor } };
    };
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
        this.messageService.add({ severity: 'success', summary: this.msgLancamentoCriado });

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handler(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);

        this.messageService.add({ severity: 'success', summary: this.msgLancamentoAtualizado });
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
