import { AuthGuard } from './../../guards/auth.guard';
import { FuncionarioComponent } from './funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { Funcionario } from './../../core/funcionario';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'funcionario/cadastrar', component: CadastrarFuncionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FUNCIONARIO} },
  {path: 'funcionario', component: FuncionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FUNCIONARIO} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
