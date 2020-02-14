import { MaterialCommonModule } from './../../../material-modules/material-common.module';
import { ContasCentrosCustoComponent } from './contas-centros-custo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ContasCentrosCustoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[ContasCentrosCustoComponent]
})
export class ContasCentrosCustoModule { }
