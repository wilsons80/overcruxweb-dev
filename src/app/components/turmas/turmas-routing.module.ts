import { CadastrarTurmasComponent } from './cadastrar-turmas/cadastrar-turmas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurmasComponent } from './turmas.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'turmas/cadastrar', component: CadastrarTurmasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TURMAS} },
  { path: 'turmas', component: TurmasComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.TURMAS} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmasRoutingModule { }
