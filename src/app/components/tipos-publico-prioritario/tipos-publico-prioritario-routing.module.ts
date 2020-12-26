import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarTiposPublicoPrioritarioComponent } from './cadastrar-situacao-ex-aluno/cadastrar-tipos-publico-prioritario.component';
import { TiposPublicoPrioritarioComponent } from './tipos-publico-prioritario.component';


const routes: Routes = [
  { path: 'tipospublicoprioritario/cadastrar', component: CadastrarTiposPublicoPrioritarioComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.TIPOS_PUBLICOS_PRIORITARIOS } },
  { path: 'tipospublicoprioritario', component: TiposPublicoPrioritarioComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.TIPOS_PUBLICOS_PRIORITARIOS } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposPublicoPrioritarioRoutingModule { }
