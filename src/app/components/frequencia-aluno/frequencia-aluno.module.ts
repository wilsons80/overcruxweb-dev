import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaAlunoRoutingModule } from './frequencia-aluno-routing.module';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';
import { FrequenciaAlunoComponent } from './frequencia-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAtividadeModule } from '../common/dados-atividade/dados-atividade.module';


@NgModule({
  declarations: [FrequenciaAlunoComponent, CadastrarFrequenciaAlunoComponent],
  imports: [
    CommonModule,
    FrequenciaAlunoRoutingModule,
    DadosAtividadeModule,
    MaterialCommonModule
  ]
})
export class FrequenciaAlunoModule { }
