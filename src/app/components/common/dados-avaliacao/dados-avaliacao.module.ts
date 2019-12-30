import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DadosAvaliacaoComponent } from './dados-avaliacao.component';



@NgModule({
  declarations: [DadosAvaliacaoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [DadosAvaliacaoComponent]
})
export class DadosAvaliacaoModule { }
