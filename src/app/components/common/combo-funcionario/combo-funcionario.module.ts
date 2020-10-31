import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboFuncionarioComponent } from './combo-funcionario.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [ComboFuncionarioComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboFuncionarioComponent]
})
export class ComboFuncionarioModule { }
