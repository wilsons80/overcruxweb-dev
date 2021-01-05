import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarDoadoresComponent } from './cadastrar-doadores/cadastrar-doadores.component';
import { DoadoresComponent } from './doadores.component';


const routes: Routes = [
  { path: 'doadores/cadastrar', component: CadastrarDoadoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.DOADORES } },
  { path: 'doadores', component: DoadoresComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.DOADORES } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoadoresRoutingModule { }
