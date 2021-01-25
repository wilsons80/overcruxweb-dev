import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RelatoriosFinanceiroComponent } from './relatorios-financeiro.component';


const routes: Routes = [
  { path: 'relatoriofinanceiro', component: RelatoriosFinanceiroComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.RELATORIO_FINANCEIRO} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosFinanceiroRoutingModule { }
