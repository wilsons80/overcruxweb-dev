import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from './../../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParceriasCategoriasComponent } from './parcerias-categorias.component';



@NgModule({
  declarations: [ParceriasCategoriasComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    NgxCurrencyModule
  ],
  exports:[ParceriasCategoriasComponent]
})
export class ParceriasCategoriasModule { }
