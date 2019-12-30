import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/core/aluno';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.ALUNO);
  }

  getAlunosByNome(nome: string) {
    return this.http.get(`${Rotas.ALUNO}nome/${nome}`);
  }

}
