import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { Pessoa, Estado, Cidade } from './../core/model';
import { environment } from './../../environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable()
export class PessoaService {

  pessoaUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: AuthHttp) {

    this.pessoaUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());


    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const retorno = {
          pessoas: pessoas,
          total: responseJson.totalElements
        };
        return retorno;
      });


  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoaUrl}`)
      .toPromise()
      .then(response => response.json().content);

  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, !status)
      .toPromise()
      .then(() => null);

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoaUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());

  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }


  obterEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl)
      .toPromise()
      .then(response => response.json()) ;
  }

  obterCidadesDoEstado(codigoEstado: number): Promise<Cidade[]> {

    return this.http.get(`${this.cidadesUrl}/${codigoEstado}`)
      .toPromise()
      .then(response => response.json());
  }

}
