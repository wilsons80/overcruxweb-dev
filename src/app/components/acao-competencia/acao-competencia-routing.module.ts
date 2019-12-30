import { CadastrarAcaoCompetenciaComponent } from './cadastrar-acao-competencia/cadastrar-acao-competencia.component';
import { AcaoCompetenciaComponent } from './acao-competencia.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'acaocompetencia/cadastrar', component: CadastrarAcaoCompetenciaComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ACAO_COMPETENCIA} },
  { path: 'acaocompetencia', component: AcaoCompetenciaComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ACAO_COMPETENCIA} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcaoCompetenciaRoutingModule { }
