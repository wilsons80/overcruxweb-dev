import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AvaliacaoAluno } from 'src/app/core/avaliacao-aluno';
import { Rotas } from 'src/app/core/rotas';


@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAlunoService extends BaseService<AvaliacaoAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.AVALIACAO_ALUNO);
  }

  alterarAll(frequenciasAluno: AvaliacaoAluno[], idAtividade: number, idAvaliacao: number) {
    return this.http.put(`${Rotas.AVALIACAO_ALUNO}avaliacao/atividade/${idAtividade}`, frequenciasAluno, { params: {
      avaliacao: `${idAvaliacao}`}
    });
  }

  getListaAvaliacoes(idAtividade: number, idAvaliacao: number) {
    return this.http.get(Rotas.AVALIACAO_ALUNO + 'avaliacao/atividade/' + idAtividade, { params: {
      avaliacao: `${idAvaliacao}`}
    });
  }

  getAlunosMatriculados(idAtividade: number, idAvaliacao: number) {
    return this.http.get(Rotas.AVALIACAO_ALUNO + 'matriculado/atividade/' + idAtividade, { params: {
      avaliacao: `${idAvaliacao}`}
    });
  }

}
