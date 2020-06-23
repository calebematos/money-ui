import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncotradaComponent } from './core/pagina-nao-encotrada.component';

const router: Routes = [

  { path: 'lancamentos', loadChildren: () => import('app/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('app/pessoas/pessoas.module').then(m => m.PessoasModule) },
  { path: 'dashboard', loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'relatorios', loadChildren: () => import('app/relatorios/relatorios.module').then(m => m.RelatoriosModule) },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encotrada', component: PaginaNaoEncotradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
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
