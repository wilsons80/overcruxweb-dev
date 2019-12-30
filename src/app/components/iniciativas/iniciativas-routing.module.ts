import { CadastrarIniciativasComponent } from './cadastrar-iniciativas/cadastrar-iniciativas.component';
import { IniciativasComponent } from './iniciativas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'iniciativas/cadastrar', component: CadastrarIniciativasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.INICIATIVAS} },
  { path: 'iniciativas', component: IniciativasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.INICIATIVAS} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciativasRoutingModule { }
