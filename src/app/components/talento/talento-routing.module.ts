import { CadastrarTalentoComponent } from './cadastrar-talento/cadastrar-talento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentoComponent } from './talento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'talento/cadastrar', component: CadastrarTalentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TALENTO} },
  { path: 'talento', component: TalentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TALENTO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentoRoutingModule { }
