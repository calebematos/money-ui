import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncotradaComponent } from './core/pagina-nao-encotrada.component';

const router: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
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