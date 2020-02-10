import { AuthGuard } from 'src/app/guards/auth.guard';
import { FuncoesComponent } from './funcoes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarFuncoesComponent } from './cadastrar-funcoes/cadastrar-funcoes.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path:'funcoes/cadastrar', component: CadastrarFuncoesComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FUNCOES} },
  {path:'funcoes', component: FuncoesComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.FUNCOES} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncoesRoutingModule { }
