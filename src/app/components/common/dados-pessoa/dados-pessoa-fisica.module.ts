import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosPessoaFisicaComponent } from './dados-pessoa-fisica.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';



@NgModule({
  declarations: [DadosPessoaFisicaComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[DadosPessoaFisicaComponent]
})
export class DadosPessoaFisicaModule { }
