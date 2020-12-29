import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { SituacaoExAluno } from './../../core/situacoes-ex-alunos';

@Injectable({
  providedIn: 'root'
})
export class SituacoesExAlunosService extends BaseService<SituacaoExAluno> {
  constructor(http: HttpClient) {
    super(http, Rotas.SITUACOES_EX_ALUNOS);
  }

  getAllByCombo() {
    return this.http.get(`${Rotas.SITUACOES_EX_ALUNOS}dados/combo`);
  }


}
