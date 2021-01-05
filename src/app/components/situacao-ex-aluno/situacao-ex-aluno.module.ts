import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SituacaoExAlunoRoutingModule } from './situacao-ex-aluno-routing.module';
import { SituacaoExAlunoComponent } from './situacao-ex-aluno.component';
import { CadastrarSituacaoExAlunoComponent } from './cadastrar-situacao-ex-aluno/cadastrar-situacao-ex-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { ComboBeneficiarioModule } from '../common/combo-beneficiario/combo-beneficiario.module';
import { ComboPesquisavelModule } from '../common/combo-pesquisavel/combo-pesquisavel.module';


@NgModule({
  declarations: [SituacaoExAlunoComponent, CadastrarSituacaoExAlunoComponent],
  imports: [
    CommonModule,
    SituacaoExAlunoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    ComboBeneficiarioModule,
    ComboPesquisavelModule

  ]
})
export class SituacaoExAlunoModule { }
