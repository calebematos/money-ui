import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import * as moment from 'moment';
import { Lancamento } from '../core/model';
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

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const retorno = {
          lancamentos,
          total: responseJson.totalElements
        };
        return retorno;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoResponse = response.json() as Lancamento;
        this.converterStringParaDatas([lancamentoResponse]);
        return lancamentoResponse;
      });

  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamentoResponse = response.json() as Lancamento;
        this.converterStringParaDatas([lancamentoResponse]);
        return lancamentoResponse;
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
