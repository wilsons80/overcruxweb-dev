import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoquesComponent } from './estoques.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'estoques', component: EstoquesComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ESTOQUES} }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoquesRoutingModule { }
