import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncotradaComponent } from './core/pagina-nao-encotrada.component';

const router: Routes = [

  { path: 'mymoney/lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'mymoney/pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'mymoney/dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'mymoney/relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  { path: 'mymoney/', redirectTo: 'mymoney/dashboard', pathMatch: 'full' },
  { path: 'mymoney/pagina-nao-encotrada', component: PaginaNaoEncotradaComponent },
  { path: 'mymoney/nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'mymoney/**', redirectTo: 'pagina-nao-encotrada' }
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
