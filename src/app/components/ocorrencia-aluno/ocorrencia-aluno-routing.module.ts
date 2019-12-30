import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarOcorrenciaAlunoComponent } from './cadastrar-ocorrencia-aluno/cadastrar-ocorrencia-aluno.component';
import { OcorrenciaAlunoComponent } from './ocorrencia-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'ocorrenciaaluno/cadastrar', component: CadastrarOcorrenciaAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OCORRENCIA_ALUNO} },
  { path: 'ocorrenciaaluno', component: OcorrenciaAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OCORRENCIA_ALUNO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcorrenciaAlunoRoutingModule { }
