import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliacaoAtividadeComponent } from './avaliacao-atividade.component';
import { CadastrarAvaliacaoAtividadeComponent } from './cadastrar-avaliacao-atividade/cadastrar-avaliacao-atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'avaliacaoatividade/cadastrar', component: CadastrarAvaliacaoAtividadeComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.AVALIACAO_ATIVIDADE}},
  { path: 'avaliacaoatividade', component: AvaliacaoAtividadeComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.AVALIACAO_ATIVIDADE}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoAtividadeRoutingModule { }
