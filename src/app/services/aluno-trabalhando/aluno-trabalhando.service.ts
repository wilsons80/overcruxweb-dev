import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AlunoTrabalhando } from 'src/app/core/aluno-trabalhando';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class AlunoTrabalhandoService extends BaseService<AlunoTrabalhando> {

  constructor(http: HttpClient) {
    super(http, Rotas.ALUNO_TRABALHANDO);
  }
}
