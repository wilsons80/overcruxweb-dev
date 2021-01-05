import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboBeneficiarioModule } from '../common/combo-beneficiario/combo-beneficiario.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';
import { MotivoDesligamentoComponent } from './motivo-desligamento.component';
import { CadastrarMotivoDesligamentoComponent } from './cadastrar-situacao-ex-aluno/cadastrar-motivo-desligamento.component';
import { MotivoDesligamentoRoutingModule } from './motivo-desligamento-routing.module';


@NgModule({
  declarations: [MotivoDesligamentoComponent, CadastrarMotivoDesligamentoComponent],
  imports: [
    CommonModule,
    MotivoDesligamentoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    ComboBeneficiarioModule,
    ComboPesquisavelModule

  ]
})
export class MotivoDesligamentoModule { }
