import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosMateriaisComponent } from './pedidos-materiais.component';
import { CadastrarPedidosMateriaisComponent } from './cadastrar-pedidos-materiais/cadastrar-pedidos-materiais.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path:'pedidosmateriais/cadastrar', component: CadastrarPedidosMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PEDIDOS_MATERIAIS} },
  {path:'pedidosmateriais', component: PedidosMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PEDIDOS_MATERIAIS} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosMateriaisRoutingModule { }
