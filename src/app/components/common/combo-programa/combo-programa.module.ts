import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboProgramaComponent } from './combo-programa.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [ComboProgramaComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboProgramaComponent]
})
export class ComboProgramaModule { }
