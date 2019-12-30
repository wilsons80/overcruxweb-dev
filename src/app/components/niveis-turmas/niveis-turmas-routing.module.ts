import { CadastrarNiveisTurmasComponent } from './cadastrar-niveis-turmas/cadastrar-niveis-turmas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NiveisTurmasComponent } from './niveis-turmas.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'niveisturmas/cadastrar', component: CadastrarNiveisTurmasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.NIVEIS_TURMAS} },
  { path: 'niveisturmas', component: NiveisTurmasComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.NIVEIS_TURMAS} },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiveisTurmasRoutingModule { }
