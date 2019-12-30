import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReprovacaoAlunoComponent } from './reprovacao-aluno.component';
import { CadastrarReprovacaoAlunoComponent } from './cadastrar-reprovacao-aluno/cadastrar-reprovacao-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'reprovacaoaluno/cadastrar', component: CadastrarReprovacaoAlunoComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.REPROVACAO_ALUNO} },
  { path: 'reprovacaoaluno', component: ReprovacaoAlunoComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.REPROVACAO_ALUNO}},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReprovacaoAlunoRoutingModule { }
