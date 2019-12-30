import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { OcorrenciaAluno } from 'src/app/core/ocorrencia-aluno';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaAlunoService extends BaseService<OcorrenciaAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.OCORRENCIA_ALUNO);
  }


  getFilter(idTipoOcorrencia: string|number, idAluno: string|number) {
    idTipoOcorrencia = idTipoOcorrencia || '';
    idAluno = idAluno || '';

    return this.http.get(Rotas.OCORRENCIA_ALUNO + 'filter', { params: {
        tipoocorrencia: `${idTipoOcorrencia}` ,
        aluno: `${idAluno}`
      }
    });
  }

}
