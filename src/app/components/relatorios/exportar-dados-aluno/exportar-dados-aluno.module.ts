import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportarDadosAlunoRoutingModule } from './exportar-dados-aluno-routing.module';
import { ExportarDadosAlunoComponent } from './exportar-dados-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { ComboPesquisavelModule } from '../../common/combo-pesquisavel/combo-pesquisavel.module';
import { ComboBeneficiarioModule } from '../../common/combo-beneficiario/combo-beneficiario.module';


@NgModule({
  declarations: [ExportarDadosAlunoComponent],
  imports: [
    CommonModule,
    ExportarDadosAlunoRoutingModule,
    MaterialCommonModule,
    ComboPesquisavelModule,
    ComboBeneficiarioModule
  ]
})
export class ExportarDadosAlunoModule { }
