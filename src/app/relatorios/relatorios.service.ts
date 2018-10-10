import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MoneyHttp } from '../seguranca/money-http';
import { environment } from './../../environments/environment';

@Injectable()
export class RelatoriosService {

  lancamentoUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }


  gerarRelatorioLancamentosPorPessoa(inicio: Date, fim: Date) {

    const params = new HttpParams()
      .append('inicio', moment(inicio).format('YYYY-MM-DD'))
      .append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentoUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }

}
