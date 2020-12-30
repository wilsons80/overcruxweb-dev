import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { LoadingPopupModule } from 'src/app/services/loadingPopup/loading-popup.module';
import { RelatoriosBeneficiariosComponent } from './relatorios-beneficiarios.component';
import { RelatoriosBeneficiariosRoutingModule } from './relatorios-beneficiarios-routing.module';
import { ComboPesquisavelModule } from '../../common/combo-pesquisavel/combo-pesquisavel.module';
import { ComboProjetoModule } from '../../common/combo-projeto/combo-projeto.module';
import { ComboProgramaModule } from '../../common/combo-programa/combo-programa.module';
import { ComboBeneficiarioModule } from '../../common/combo-beneficiario/combo-beneficiario.module';

@NgModule({
  declarations: [RelatoriosBeneficiariosComponent],
  imports: [
    CommonModule,
    RelatoriosBeneficiariosRoutingModule,
    MaterialCommonModule,
    LoadingPopupModule,
    ComboPesquisavelModule,
    ComboBeneficiarioModule,
    ComboProgramaModule,
    ComboProjetoModule,
  ]
})
export class RelatoriosBeneficiariosModule { }
