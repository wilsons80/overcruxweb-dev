import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoTrabalhandoComponent } from './aluno-trabalhando.component';
import { CadastrarAlunoTrabalhandoComponent } from './cadastrar-aluno-trabalhando/cadastrar-aluno-trabalhando.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';


const routes: Routes = [
  { path: 'alunotrabalhando/cadastrar', component: CadastrarAlunoTrabalhandoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ALUNO_TRABALHANDO}},
  { path: 'alunotrabalhando', component: AlunoTrabalhandoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ALUNO_TRABALHANDO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoTrabalhandoRoutingModule { }
