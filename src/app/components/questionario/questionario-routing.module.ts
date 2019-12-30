import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarQuestionarioComponent } from './cadastrar-questionario/cadastrar-questionario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { QuestionarioComponent } from './questionario.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'questionario/cadastrar', component: CadastrarQuestionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.QUESTIONARIO} },
  { path: 'questionario', component: QuestionarioComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.QUESTIONARIO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionarioRoutingModule { }
