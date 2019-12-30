import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarPerspectivaComponent } from './cadastrar-perspectiva/cadastrar-perspectiva.component';
import { PerspectivaComponent } from './perspectiva.component';


const routes: Routes = [
  { path: 'perspectiva/cadastrar', component: CadastrarPerspectivaComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.PERSPECTIVA } },
  { path: 'perspectiva', component: PerspectivaComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.PERSPECTIVA } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerspectivaRoutingModule { }
