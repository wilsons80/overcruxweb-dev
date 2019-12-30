import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarOficinaComponent } from './cadastrar-oficina/cadastrar-oficina.component';
import { OficinaComponent } from './oficina.component';


const routes: Routes = [
  { path: 'oficinas/cadastrar', component: CadastrarOficinaComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OFICINA} },
  { path: 'oficinas', component: OficinaComponent ,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.OFICINA} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinaRoutingModule { }
