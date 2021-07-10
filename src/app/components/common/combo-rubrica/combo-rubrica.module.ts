import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';
import { ComboRubricaComponent } from './combo-rubrica.component';



@NgModule({
  declarations: [ComboRubricaComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboRubricaComponent]
})
export class ComboRubricaModule { }
