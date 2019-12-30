import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class TipoOcorrenciaAlunoService extends BaseService<TipoOcorrenciaAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.TIPO_OCORRENCIA_ALUNO);
  }

}
