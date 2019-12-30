import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';


const routes: Routes = [
  { path: 'encaminhamentoaluno/cadastrar', component: CadastrarEncaminhamentoAlunoComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ENCAMINHAMENTO_ALUNO} },
  { path: 'encaminhamentoaluno', component: EncaminhamentoAlunoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ENCAMINHAMENTO_ALUNO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncaminhamentoAlunoRoutingModule { }
