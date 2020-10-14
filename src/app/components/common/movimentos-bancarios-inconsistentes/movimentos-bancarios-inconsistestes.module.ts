import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MovimentosBancariosInconsistentesComponent } from './movimentos-bancarios-inconsistentes.component';



@NgModule({
  declarations: [MovimentosBancariosInconsistentesComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [MovimentosBancariosInconsistentesComponent]
})
export class MovimentosBancariosInconsistestesModule { }
