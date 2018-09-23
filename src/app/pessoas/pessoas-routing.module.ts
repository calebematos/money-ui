import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const router: Routes = [
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'pessoas/nova',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'pessoas/:codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(router)

  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
