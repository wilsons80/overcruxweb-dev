import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarSituacaoVulnerabilidadeComponent } from './cadastrar-situacao-vulnerabilidade/cadastrar-situacao-vulnerabilidade.component';
import { SituacaoVulnerabilidadeComponent } from './situacao-vulnerabilidade.component';


const routes: Routes = [
  { path: 'situacaovulnerabilidade/cadastrar', component: CadastrarSituacaoVulnerabilidadeComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.SITUACAO_VULNERABILIDADE } },
  { path: 'situacaovulnerabilidade', component: SituacaoVulnerabilidadeComponent, canActivate: [AuthGuard], resolve: { perfilAcesso: AcessoModuloResolver }, data: { modulo: Modulos.SITUACAO_VULNERABILIDADE } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacaoVulnerabilidadeRoutingModule { }
