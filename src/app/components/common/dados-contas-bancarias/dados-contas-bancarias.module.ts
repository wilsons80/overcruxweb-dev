import { MaterialCommonModule } from './../../../material-modules/material-common.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DadosContasBancariasComponent } from './dados-contas-bancarias.component';



@NgModule({
  declarations: [DadosContasBancariasComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [DadosContasBancariasComponent]
})
export class DadosContasBancariasModule { }
