import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SituacaoExAlunoRoutingModule } from './situacao-ex-aluno-routing.module';
import { SituacaoExAlunoComponent } from './situacao-ex-aluno.component';
import { CadastrarSituacaoExAlunoComponent } from './cadastrar-situacao-ex-aluno/cadastrar-situacao-ex-aluno.component';


@NgModule({
  declarations: [SituacaoExAlunoComponent, CadastrarSituacaoExAlunoComponent],
  imports: [
    CommonModule,
    SituacaoExAlunoRoutingModule

  ]
})
export class SituacaoExAlunoModule { }
