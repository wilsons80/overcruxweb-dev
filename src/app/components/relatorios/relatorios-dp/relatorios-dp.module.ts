import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosDpRoutingModule } from './relatorios-dp-routing.module';
import { RelatoriosDpComponent } from './relatorios-dp.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPesquisavelModule } from '../../common/combo-pesquisavel/combo-pesquisavel.module';
import { ComboProgramaModule } from '../../common/combo-programa/combo-programa.module';
import { ComboProjetoModule } from '../../common/combo-projeto/combo-projeto.module';
import { LoadingPopupModule } from 'src/app/services/loadingPopup/loading-popup.module';
import { ComboFuncionarioModule } from '../../common/combo-funcionario/combo-funcionario.module';


@NgModule({
  declarations: [RelatoriosDpComponent],
  imports: [
    CommonModule,
    RelatoriosDpRoutingModule,
    MaterialCommonModule,
    ComboPesquisavelModule,
    ComboProgramaModule,
    ComboProjetoModule,
    ComboFuncionarioModule,
    LoadingPopupModule
  ]
})
export class RelatoriosDpModule { }
