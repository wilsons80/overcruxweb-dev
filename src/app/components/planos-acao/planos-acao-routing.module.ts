import { CadastrarPlanosAcaoComponent } from './cadastrar-planos-acao/cadastrar-planos-acao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PlanosAcaoComponent } from './planos-acao.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [

  { path: 'planosacao/cadastrar', component: CadastrarPlanosAcaoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PLANOS_ACAO} },
  { path: 'planosacao', component: PlanosAcaoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PLANOS_ACAO} },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosAcaoRoutingModule { }
