import { CotacoesMateriaisComponent } from './cotacoes-materiais.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCotacoesMateriaisComponent } from './cadastrar-cotacoes-materiais/cadastrar-cotacoes-materiais.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'cotacoesmateriais/cadastrar', component: CadastrarCotacoesMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COTACOES_MATERIAIS} },
  {path: 'cotacoesmateriais', component: CotacoesMateriaisComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COTACOES_MATERIAIS} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotacoesMateriaisRoutingModule { }
