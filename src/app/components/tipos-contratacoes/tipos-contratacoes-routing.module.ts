import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposContratacoesComponent } from './tipos-contratacoes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarTipoContratacoesComponent } from './cadastrar-tipo-contratacoes/cadastrar-tipo-contratacoes.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'tiposcontratacoes', component: TiposContratacoesComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPOS_CONTRATACOES} },
  { path: 'tiposcontratacoes/cadastrar', component: CadastrarTipoContratacoesComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPOS_CONTRATACOES} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposContratacoesRoutingModule { }
