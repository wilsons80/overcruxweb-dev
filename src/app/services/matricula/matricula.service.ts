import { AlunosTurma } from './../../core/alunos-turma';
import { Rotas } from './../../core/rotas';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService extends BaseService<AlunosTurma> {

  constructor(http: HttpClient) {
    super(http, Rotas.MATRICULAS);
  }

  getFilter(idTurma: string|number, idOficina: string|number, idAluno: string|number) {
    idTurma = idTurma || '';
    idOficina = idOficina || '';
    idAluno = idAluno || '';

    return this.http.get(Rotas.MATRICULAS + 'alunos', { params: {
        turma: `${idTurma}` ,
        oficina: `${idOficina}` ,
        aluno: `${idAluno}`
      }
    });
  }

}
