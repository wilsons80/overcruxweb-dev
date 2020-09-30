import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProvisionamentoComponent } from './provisionamento.component';


const routes: Routes = [
  {path: 'provisao', component: ProvisionamentoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PROVISAO} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvisionamentoRoutingModule { }
