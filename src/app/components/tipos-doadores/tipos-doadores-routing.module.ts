import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarTiposDoadoresComponent } from './cadastrar-tipos-doadores/cadastrar-tipos-doadores.component';
import { TiposDoadoresComponent } from './tipos-doadores.component';


const routes: Routes = [
  { path: 'tiposdoadores/cadastrar', component: CadastrarTiposDoadoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.TIPOS_DOADORES } },
  { path: 'tiposdoadores', component: TiposDoadoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.TIPOS_DOADORES } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposDoadoresRoutingModule { }
