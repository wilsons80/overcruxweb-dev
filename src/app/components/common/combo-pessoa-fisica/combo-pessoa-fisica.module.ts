import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';
import { ComboPessoaFisicaComponent } from './combo-pessoa-fisica.component';



@NgModule({
  declarations: [ComboPessoaFisicaComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboPessoaFisicaComponent]
})
export class ComboPessoaFisicaModule { }
