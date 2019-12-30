import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ReprovacaoAluno } from 'src/app/core/reprovacao-aluno';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ReprovacaoAlunoService extends BaseService<ReprovacaoAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.REPROVACAO_ALUNO);
  }
  
}
