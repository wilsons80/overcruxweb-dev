import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { Programa } from 'src/app/core/programa';


@Injectable({
  providedIn: 'root'
})
export class ProgramaService extends BaseService<Programa> {

  constructor(http: HttpClient) {
    super(http, Rotas.PROGRAMA);
  }

  getAllProgramasIntituicaoLogada() {
    return this.http.get(`${Rotas.PROGRAMA}instituicao/logada`);
  }

}
