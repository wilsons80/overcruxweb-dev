import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaldosContasBancariaRoutingModule } from './saldos-contas-bancaria-routing.module';
import { SaldosContasBancariaDialogComponent } from './saldos-contas-bancaria-dialog/saldos-contas-bancaria-dialog.component';
import { SaldosContasBancariaComponent } from './saldos-contas-bancaria.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ExtratoContaBancariaComponent } from './extrato-conta-bancaria/extrato-conta-bancaria.component';


@NgModule({
  declarations: [SaldosContasBancariaComponent, SaldosContasBancariaDialogComponent, ExtratoContaBancariaComponent],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    SharedDirectivesModule,
    MaterialCommonModule,
    SaldosContasBancariaRoutingModule
  ]
})
export class SaldosContasBancariaModule { }
