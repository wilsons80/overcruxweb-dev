import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboProjetoComponent } from './combo-projeto.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [ComboProjetoComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboProjetoComponent]
})
export class ComboProjetoModule { }
