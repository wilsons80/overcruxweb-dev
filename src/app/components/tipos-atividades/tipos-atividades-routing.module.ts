import { TiposAtividadesComponent } from './tipos-atividades.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarTiposAtividadesComponent } from './cadastrar-tipos-atividades/cadastrar-tipos-atividades.component';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarTalentoComponent } from '../talento/cadastrar-talento/cadastrar-talento.component';
import { TalentoComponent } from '../talento/talento.component';


const routes: Routes = [
  { path: 'tiposatividades/cadastrar', component: CadastrarTiposAtividadesComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPOS_ATIVIDADES} },
  { path: 'tiposatividades', component: TiposAtividadesComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TIPOS_ATIVIDADES} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposAtividadesRoutingModule { }
