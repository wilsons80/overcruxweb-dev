import { SituacaoExAlunoComponent } from './situacao-ex-aluno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarSituacaoExAlunoComponent } from './cadastrar-situacao-ex-aluno/cadastrar-situacao-ex-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'situacoesexalunos/cadastrar', component: CadastrarSituacaoExAlunoComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.SITUACOES_EX_ALUNOS } },
  { path: 'situacoesexalunos', component: SituacaoExAlunoComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.SITUACOES_EX_ALUNOS } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacaoExAlunoRoutingModule { }
