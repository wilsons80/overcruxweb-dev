import { CategoriasContabeisComponent } from './categorias-contabeis.component';
import { CadastrarCategoriasContabeisComponent } from './cadastrar-categorias-contabeis/cadastrar-categorias-contabeis.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgModule } from '@angular/core';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'planoscontascontabeis/cadastrar', component: CadastrarCategoriasContabeisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PLANOS_CONTAS_CONTABEIS} },
  {path: 'planoscontascontabeis', component: CategoriasContabeisComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PLANOS_CONTAS_CONTABEIS} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasContabeisRoutingModule { }
