import { ParticipanteAtendimentoComponent } from './participante-atendimento.component';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarParticipanteAtendimentoComponent } from './cadastrar-participante-atendimento/cadastrar-participante-atendimento.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [];
/*
const routes: Routes = [
  { path: 'participanteatendimento/cadastrar', component: CadastrarParticipanteAtendimentoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PARTICIPANTE_ATENDIMENTO} },
  { path: 'participanteatendimento', component: ParticipanteAtendimentoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PARTICIPANTE_ATENDIMENTO} },
];
*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipanteAtendimentoRoutingModule { }
