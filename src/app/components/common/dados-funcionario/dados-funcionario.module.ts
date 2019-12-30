import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosFuncionarioComponent } from './dados-funcionario.component';



@NgModule({
  declarations: [DadosFuncionarioComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[DadosFuncionarioComponent]
})
export class DadosFuncionarioModule { }
