import { CadastrarMovimentacoesComponent } from './cadastrar-movimentacoes/cadastrar-movimentacoes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesComponent } from './movimentacoes.component';


const routes: Routes = [
  { path: 'movimentacoes/cadastrar', component: CadastrarMovimentacoesComponent},
  { path: 'movimentacoes', component: MovimentacoesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesRoutingModule { }
