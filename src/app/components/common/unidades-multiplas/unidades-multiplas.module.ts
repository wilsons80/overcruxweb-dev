import { MaterialCommonModule } from './../../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesMultiplasComponent } from './unidades-multiplas.component';



@NgModule({
  declarations: [UnidadesMultiplasComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports: [UnidadesMultiplasComponent]
})
export class UnidadesMultiplasModule { }
