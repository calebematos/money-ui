import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { MoneyHttp } from '../seguranca/money-http';
import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentoUrl = `${environment.apiUrl}/lancamentos`;

  constructor(private http: MoneyHttp) { }


  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentoUrl}/estatisticas/por-categoria`)
      .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        this.converterStringParaDatas(response);
        return response;
      });
  }

  converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
