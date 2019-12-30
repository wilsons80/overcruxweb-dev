import { DadosAvaliacaoModule } from './../common/dados-avaliacao/dados-avaliacao.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from './../common/dados-aluno/dados-aluno.module';
import { DadosAtividadeModule } from './../common/dados-atividade/dados-atividade.module';
import { AvaliacaoAlunoRoutingModule } from './avaliacao-aluno-routing.module';
import { AvaliacaoAlunoComponent } from './avaliacao-aluno.component';



@NgModule({
  declarations: [AvaliacaoAlunoComponent],
  imports: [
    CommonModule,
    AvaliacaoAlunoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule,
    DadosAtividadeModule,
    DadosAvaliacaoModule
  ]
})
export class AvaliacaoAlunoModule { }
