import { NgModule } from '@angular/core';
import { DadosAtividadeComponent } from './dados-atividade.component';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';




@NgModule({
  declarations: [DadosAtividadeComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ],
  exports:[DadosAtividadeComponent]
})
export class DadosAtividadeModule { }
