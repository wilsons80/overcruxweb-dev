import { AuthGuard } from '../../guards/auth.guard';
import { MovimentacoesContabeisComponent } from './movimentacoes-contabeis.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarMovimentacoesContabeisComponent } from './cadastrar-movimentacoes-contabeis/cadastrar-movimentacoes-contabeis.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';

// ,resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONTAS_BANCARIA} 
const routes: Routes = [
  {path: 'movimentacoescontabeis/cadastrar', component: CadastrarMovimentacoesContabeisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MOVIMENTACOES_CONTABIES}},
  {path: 'movimentacoescontabeis', component: MovimentacoesContabeisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MOVIMENTACOES_CONTABIES}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacoesContabeisRoutingModule { }
