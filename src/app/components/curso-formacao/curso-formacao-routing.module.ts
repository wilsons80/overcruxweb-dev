import { CursoFormacao } from 'src/app/core/curso-formacao';
import { Modulo } from './../../core/modulo';
import { AcessoModuloResolver } from './../../guards/acesso-modulo.resolve';
import { AuthGuard } from './../../guards/auth.guard';
import { CadastrarCursoFormacaoComponent } from './cadastrar-curso-formacao/cadastrar-curso-formacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoFormacaoComponent } from './curso-formacao.component';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'cursoformacao/cadastrar', component: CadastrarCursoFormacaoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CURSO_FORMACAO} },
  {path: 'cursoformacao', component: CursoFormacaoComponent, canActivate: [AuthGuard], resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.CURSO_FORMACAO}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoFormacaoRoutingModule { }
