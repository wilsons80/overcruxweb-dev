import { CadastrarMovimentacoesComponent } from './cadastrar-movimentacoes/cadastrar-movimentacoes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentacoesComponent } from './movimentacoes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

// { path: 'metas/cadastrar', component: CadastrarMetasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.METAS} },
const routes: Routes = [
  { path: 'movimentacoes/cadastrar', component: CadastrarMovimentacoesComponent, canActivate: [AuthGuard]},
  { path: 'movimentacoes', component: MovimentacoesComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesRoutingModule { }
