import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosUnidadeComponent } from './dados-unidade.component';




@NgModule({
  declarations: [DadosUnidadeComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [DadosUnidadeComponent]
})
export class DadosUnidadeModule { }
