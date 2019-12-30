import { MaterialCommonModule } from './../../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosEntidadeSocialComponent } from './dados-entidade-social.component';



@NgModule({
  declarations: [DadosEntidadeSocialComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[DadosEntidadeSocialComponent]
})
export class DadosEntidadeSocialModule { }
