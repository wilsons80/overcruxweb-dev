import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolucaoAtendimentoComponent } from './solucao-atendimento.component';
import { CadastrarSolucaoAtendimentoComponent } from './cadastrar-solucao-atendimento/cadastrar-solucao-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'solucaoatendimento/cadastrar', component: CadastrarSolucaoAtendimentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.SOLUCAO_ATENDIMENTO}},
  { path: 'solucaoatendimento', component: SolucaoAtendimentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.SOLUCAO_ATENDIMENTO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolucaoAtendimentoRoutingModule { }
