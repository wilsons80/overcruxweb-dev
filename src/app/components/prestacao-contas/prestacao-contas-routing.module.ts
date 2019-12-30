import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PrestacaoContasComponent } from './prestacao-contas.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarPrestacaoContasComponent } from './cadastrar-prestacao-contas/cadastrar-prestacao-contas.component';


const routes: Routes = [
  { path: 'planosacao/cadastrar', component: CadastrarPrestacaoContasComponent ,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PLANOS_ACAO} },
  { path: 'prestacaocontas', component: PrestacaoContasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PRESTACAO_CONTAS} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestacaoContasRoutingModule { }
