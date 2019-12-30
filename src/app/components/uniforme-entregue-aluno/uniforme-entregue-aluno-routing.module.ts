import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniformeEntregueAlunoComponent } from './uniforme-entregue-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'uniformeentregue', component: UniformeEntregueAlunoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.UNIFORME_ENTREGUE_ALUNO}},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniformeEntregueAlunoRoutingModule { }
