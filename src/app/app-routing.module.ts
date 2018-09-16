import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PaginaNaoEncotradaComponent } from './core/pagina-nao-encotrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

const router: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pagina-nao-encotrada', component: PaginaNaoEncotradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encotrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
