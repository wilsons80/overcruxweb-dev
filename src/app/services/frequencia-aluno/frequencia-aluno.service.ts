import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { FrequenciaAluno } from 'src/app/core/frequencia-aluno';
import { Rotas } from 'src/app/core/rotas';
import { Moment } from "node_modules/moment/moment";

@Injectable({
  providedIn: 'root'
})
export class FrequenciaAlunoService extends BaseService<FrequenciaAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.FREQUENCIA_ALUNO);
  }

  alterarAll(frequenciasAluno: FrequenciaAluno[], idAtividade: number, dataReferencia: Date) {
    return this.http.put(`${Rotas.FREQUENCIA_ALUNO}matriculado/atividade/${idAtividade}`, frequenciasAluno, { params: {
      datafrequencia: `${dataReferencia.getTime()}`   }
    });
  }

  getListaFrequencia(idAtividade: number, dataReferencia: Date) {
    return this.http.get(Rotas.FREQUENCIA_ALUNO + 'frequencia/atividade/' + idAtividade, { params: {
      datafrequencia: `${dataReferencia.getTime()}`   }
    });
  }

  getAlunosMatriculados(idAtividade: number, dataReferencia: Date) {
    return this.http.get(Rotas.FREQUENCIA_ALUNO + 'matriculado/atividade/' + idAtividade, { params: {
      datafrequencia: `${dataReferencia.getTime()}`   }
    });
  }
}
