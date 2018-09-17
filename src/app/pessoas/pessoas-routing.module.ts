import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const router: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(router)

  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
