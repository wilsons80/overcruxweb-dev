import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarMatriculaComponent } from './cadastrar-matricula/cadastrar-matricula.component';
import { MatriculaComponent } from './matricula.component';


const routes: Routes = [
  { path: 'matriculas/cadastrar', component: CadastrarMatriculaComponent,canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MATRICULA}},
  { path: 'matriculas', component: MatriculaComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MATRICULA}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaRoutingModule { }
