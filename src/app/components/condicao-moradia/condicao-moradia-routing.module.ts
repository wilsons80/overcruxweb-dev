import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondicaoMoradiaComponent } from './condicao-moradia.component';
import { CadastrarCondicaoMoradiaComponent } from './cadastrar-condicao-moradia/cadastrar-condicao-moradia.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'condicaomoradia/cadastrar', component: CadastrarCondicaoMoradiaComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONDICOES_MORADIA} },
  { path: 'condicaomoradia', component: CondicaoMoradiaComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CONDICOES_MORADIA} },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicaoMoradiaRoutingModule { }
