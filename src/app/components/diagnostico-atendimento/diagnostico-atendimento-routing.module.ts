import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticoAtendimentoComponent } from './diagnostico-atendimento.component';
import { CadastrarDiagnosticoAtendimentoComponent } from './cadastrar-diagnostico-atendimento/cadastrar-diagnostico-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'diagnosticoatendimento/cadastrar', component: CadastrarDiagnosticoAtendimentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.DIAGNOSTICO_ATENDIMENTO} },
  { path: 'diagnosticoatendimento', component: DiagnosticoAtendimentoComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.DIAGNOSTICO_ATENDIMENTO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticoAtendimentoRoutingModule { }
