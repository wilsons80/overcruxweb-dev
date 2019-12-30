import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { UnidadeComponent } from './unidade.component';
import { UnidadeResolver } from 'src/app/guards/unidades.resolve';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'unidade/escolher', component: EscolherUnidadeComponent, canActivate: [AuthGuard], resolve: { unidades: UnidadeResolver } },
  { path: 'unidade/cadastrar', component: CadastrarUnidadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.UNIDADE} },
  { path: 'unidade', component: UnidadeComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.UNIDADE} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
