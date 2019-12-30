import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequenciaAlunoComponent } from './frequencia-aluno.component';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'frequenciaaluno', component: FrequenciaAlunoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FREQUENCIA_ALUNO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequenciaAlunoRoutingModule { }
