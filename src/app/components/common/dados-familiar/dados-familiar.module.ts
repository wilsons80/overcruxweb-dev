import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosFamiliarComponent } from './dados-familiar.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';

@NgModule({
  declarations: [DadosFamiliarComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [DadosFamiliarComponent]
})
export class DadosFamiliarModule { }
