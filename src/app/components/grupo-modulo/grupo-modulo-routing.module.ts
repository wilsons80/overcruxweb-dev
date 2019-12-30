import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoModuloComponent } from './grupo-modulo.component';
import { CadastrarGrupoModuloComponent } from './cadastrar-grupo-modulo/cadastrar-grupo-modulo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';



const routes: Routes = [
  {path: 'grupomodulo/cadastrar', component: CadastrarGrupoModuloComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.GRUPO_MODULO} },
  {path: 'grupomodulo', component: GrupoModuloComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.GRUPO_MODULO} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoModuloRoutingModule { }
