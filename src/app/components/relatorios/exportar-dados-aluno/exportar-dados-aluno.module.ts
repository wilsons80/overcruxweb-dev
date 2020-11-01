import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportarDadosAlunoRoutingModule } from './exportar-dados-aluno-routing.module';
import { ExportarDadosAlunoComponent } from './exportar-dados-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPesquisavelModule } from '../../common/combo-pesquisavel/combo-pesquisavel.module';
import { ComboBeneficiarioModule } from '../../common/combo-beneficiario/combo-beneficiario.module';
import { ComboProgramaModule } from '../../common/combo-programa/combo-programa.module';
import { ComboProjetoModule } from '../../common/combo-projeto/combo-projeto.module';


@NgModule({
  declarations: [ExportarDadosAlunoComponent],
  imports: [
    CommonModule,
    ExportarDadosAlunoRoutingModule,
    MaterialCommonModule,
    ComboPesquisavelModule,
    ComboBeneficiarioModule,
    ComboProgramaModule,
    ComboProjetoModule
  ]
})
export class ExportarDadosAlunoModule { }
