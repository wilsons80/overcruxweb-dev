import { AtendimentoComponent } from './atendimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';


@NgModule({
  declarations: [AtendimentoComponent, CadastrarAtendimentoComponent],
  imports: [
    CommonModule,
    AtendimentoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule
  ]
})
export class AtendimentoModule { }
