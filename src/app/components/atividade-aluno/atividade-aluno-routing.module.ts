import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarAtividadeAlunoComponent } from './cadastrar-atividade-aluno/cadastrar-atividade-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AtividadeAlunoComponent } from './atividade-aluno.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'atividadealuno/cadastrar', component: CadastrarAtividadeAlunoComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATIVIDADE_ALUNO}},
  { path: 'atividadealuno', component: AtividadeAlunoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATIVIDADE_ALUNO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeAlunoRoutingModule { }
