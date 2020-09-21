import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConciliacaoComponent } from './conciliacao.component';


const routes: Routes = [
  {path: 'conciliacao', component: ConciliacaoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONCILIACAO_BANCARIA} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliacaoRoutingModule { }
