import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentoUrl = `${environment.apiUrl}/lancamentos`;

  constructor(private http: AuthHttp) { }


  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response.json());
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response.json();

        this.converterStringParaDatas(dados);

        return dados;
      });
  }

  converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
