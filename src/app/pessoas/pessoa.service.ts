import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { MoneyHttp } from '../seguranca/money-http';
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

  constructor(private http: MoneyHttp) {

    this.pessoaUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoaUrl}`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const retorno = {
          pessoas: pessoas,
          total: response.totalElements
        };
        return retorno;
      });


  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.pessoaUrl}`)
      .toPromise()
      .then(response => response.content);

  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, !status, { headers })
      .toPromise()
      .then(() => null);

  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
      .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }


  obterEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise();
  }

  obterCidadesDoEstado(codigoEstado: number): Promise<Cidade[]> {

    return this.http.get<Cidade[]>(`${this.cidadesUrl}/${codigoEstado}`)
      .toPromise();
  }

}
