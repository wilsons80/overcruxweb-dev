import { UniformeEntregueAlunoComponent } from './uniforme-entregue-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniformeEntregueAlunoRoutingModule } from './uniforme-entregue-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { DadosAtividadeModule } from '../common/dados-atividade/dados-atividade.module';

@NgModule({
  declarations: [UniformeEntregueAlunoComponent],
  imports: [
    CommonModule,
    UniformeEntregueAlunoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    DadosAtividadeModule,
  ]
})
export class UniformeEntregueAlunoModule { }
