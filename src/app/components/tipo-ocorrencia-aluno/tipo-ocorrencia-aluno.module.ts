import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoOcorrenciaAlunoRoutingModule } from './tipo-ocorrencia-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarTipoOcorrenciaAlunoComponent } from './cadastrar-tipo-ocorrencia-aluno/cadastrar-tipo-ocorrencia-aluno.component';
import { TipoOcorrenciaAlunoComponent } from './tipo-ocorrencia-aluno.component';


@NgModule({
  declarations: [TipoOcorrenciaAlunoComponent, CadastrarTipoOcorrenciaAlunoComponent],
  imports: [
    CommonModule,
    TipoOcorrenciaAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class TipoOcorrenciaAlunoModule { }
