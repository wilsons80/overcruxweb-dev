import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarTipoOcorrenciaAlunoComponent } from './cadastrar-tipo-ocorrencia-aluno/cadastrar-tipo-ocorrencia-aluno.component';
import { TipoOcorrenciaAlunoComponent } from './tipo-ocorrencia-aluno.component';



const routes: Routes = [
  { path: 'tipoocorrenciaaluno/cadastrar', component: CadastrarTipoOcorrenciaAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPO_OCORRENCIA_ALUNO} },
  { path: 'tipoocorrenciaaluno', component: TipoOcorrenciaAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPO_OCORRENCIA_ALUNO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoOcorrenciaAlunoRoutingModule { }
