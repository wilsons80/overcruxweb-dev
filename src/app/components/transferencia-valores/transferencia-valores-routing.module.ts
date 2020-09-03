import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarTransferenciaValoresComponent } from './cadastrar-transferencia-valores/cadastrar-transferencia-valores.component';
import { TransferenciaValoresComponent } from './transferencia-valores.component';


const routes: Routes = [
  { path: 'transferenciavalores/cadastrar', component: CadastrarTransferenciaValoresComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TRANSFERENCIA_VALORES} },
  { path: 'transferenciavalores', component: TransferenciaValoresComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TRANSFERENCIA_VALORES} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciaValoresRoutingModule { }
