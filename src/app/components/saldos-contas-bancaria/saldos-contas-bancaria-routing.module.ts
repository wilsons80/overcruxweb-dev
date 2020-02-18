import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaldosContasBancariaDialogComponent } from './saldos-contas-bancaria-dialog/saldos-contas-bancaria-dialog.component';
import { CommonModule } from '@angular/common';
import { SaldosContasBancariaComponent } from './saldos-contas-bancaria.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';



const routes: Routes = [
  { path: 'saldoscontasbancaria', component: SaldosContasBancariaComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.SALDOS_CONTAS_BANCARIA} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaldosContasBancariaRoutingModule { }
