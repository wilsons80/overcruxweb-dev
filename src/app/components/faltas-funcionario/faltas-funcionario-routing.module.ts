import { FaltasFuncionario } from './../../core/faltas-funcionario';
import { CadastrarFaltasFuncionarioComponent } from './cadastrar-faltas-funcionario/cadastrar-faltas-funcionario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FaltasFuncionarioComponent } from './faltas-funcionario.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';

const routes: Routes = [
  { path: 'faltasfuncionario/cadastrar', component: CadastrarFaltasFuncionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FALTAS_FUNCIONARIO} },
  { path: 'faltasfuncionario', component: FaltasFuncionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FALTAS_FUNCIONARIO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaltasFuncionarioRoutingModule { }
