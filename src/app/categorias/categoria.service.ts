import { Injectable } from '@angular/core';

import { MoneyHttp } from './../seguranca/money-http';
import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  categoriaUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: MoneyHttp) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriaUrl)
      .toPromise();
  }
}
