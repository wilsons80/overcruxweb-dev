import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosAlunoComponent } from './dados-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';



@NgModule({
  declarations: [DadosAlunoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[DadosAlunoComponent]
})
export class DadosAlunoModule { }
