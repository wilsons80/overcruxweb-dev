import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosDepartamentoComponent } from './dados-departamento.component';




@NgModule({
  declarations: [DadosDepartamentoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [DadosDepartamentoComponent]
})
export class DadosDepartamentoModule { }
