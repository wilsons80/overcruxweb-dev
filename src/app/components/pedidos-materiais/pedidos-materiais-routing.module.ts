import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosMateriaisComponent } from './pedidos-materiais.component';
import { CadastrarPedidosMateriaisComponent } from './cadastrar-pedidos-materiais/cadastrar-pedidos-materiais.component';


const routes: Routes = [
  {path:'pedidosmateriais/cadastrar', component: CadastrarPedidosMateriaisComponent, canActivate: [AuthGuard]},
  {path:'pedidosmateriais', component: PedidosMateriaisComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosMateriaisRoutingModule { }
