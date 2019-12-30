import { AcaoCompetencia } from './../../core/acao-competencia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AcoesCompetenciaService extends BaseService<AcaoCompetencia> {

  constructor(http: HttpClient) {
    super(http, Rotas.ACOES_COMPETENCIA);
  }

  getPorPessoa(idPessoa:number){
    return this.http.get(Rotas.ACOES_COMPETENCIA + `pessoa/${idPessoa}`);
  }
}
