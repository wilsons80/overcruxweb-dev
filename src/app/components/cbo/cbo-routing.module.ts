import { Modulos } from './../../core/modulos';
import { AcessoModuloResolver } from './../../guards/acesso-modulo.resolve';
import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCboComponent } from './cadastrar-cbo/cadastrar-cbo.component';
import { CboComponent } from './cbo.component';


const routes: Routes = [
  { path: 'cbo/cadastrar', component: CadastrarCboComponent,canActivate: [AuthGuard],resolve: {perfilAcesso: AcessoModuloResolver}, data:{modulo:Modulos.CBO} },
  { path: 'cbo', component: CboComponent,canActivate: [AuthGuard],resolve: {perfilAcesso: AcessoModuloResolver}, data:{modulo:Modulos.CBO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CboRoutingModule { }
