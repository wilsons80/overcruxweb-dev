import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoquesRoutingModule } from './estoques-routing.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { EstoquesComponent } from './estoques.component';
import { EstoqueDialogComponent } from './estoque-dialog/estoque-dialog.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [EstoquesComponent, EstoqueDialogComponent],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    SharedDirectivesModule,
    MaterialCommonModule,
    EstoquesRoutingModule
  ],
  entryComponents: [EstoqueDialogComponent],
})
export class EstoquesModule { }
