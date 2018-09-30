import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncotradaComponent } from './core/pagina-nao-encotrada.component';

const router: Routes = [

  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

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
