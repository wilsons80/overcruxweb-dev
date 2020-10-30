import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBeneficiarioComponent } from './combo-beneficiario.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComboPesquisavelModule } from '../combo-pesquisavel/combo-pesquisavel.module';



@NgModule({
  declarations: [ComboBeneficiarioComponent],
  imports: [
    CommonModule,
    MaterialCommonModule,
    MatExpansionModule,
    ComboPesquisavelModule
  ],
  exports:[ComboBeneficiarioComponent]
})
export class ComboBeneficiarioModule { }
