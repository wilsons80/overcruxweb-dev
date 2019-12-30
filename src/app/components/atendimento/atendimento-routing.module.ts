import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoComponent } from './atendimento.component';
import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'atendimento/cadastrar', component: CadastrarAtendimentoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATENDIMENTO}},
  { path: 'atendimento', component: AtendimentoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATENDIMENTO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
