import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Lancamento } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';
import { environment } from './../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable()
export class LancamentoService {

  lancamentoUrl = `${environment.apiUrl}/lancamentos`;

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentoUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response.content;

        const retorno = {
          lancamentos,
          total: response.totalElements
        };
        return retorno;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentoUrl, lancamento)
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(response => {
        this.converterStringParaDatas([response]);
        return response;
      });

  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        this.converterStringParaDatas([response]);
        return response;
      });
  }

  converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento.dataVencimento) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      }
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
