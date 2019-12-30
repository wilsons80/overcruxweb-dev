import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EscolhaFamiliarComponent } from './escolha-familiar/escolha-familiar.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'familiaraluno/cadastrar', component: CadastrarFamiliarAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FAMILIAR_ALUNO} },
  { path: 'familiaraluno/escolha', component: EscolhaFamiliarComponent , canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FAMILIAR_ALUNO}},
  { path: 'familiaraluno', component: FamiliarAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FAMILIAR_ALUNO}},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarAlunoRoutingModule { }