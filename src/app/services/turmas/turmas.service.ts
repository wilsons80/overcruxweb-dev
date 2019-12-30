import { Injectable } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class TurmasService  extends BaseService<Turmas> {

  constructor(http: HttpClient) {
    super(http, Rotas.TURMAS);
  }

  getFilter(idPrograma: string|number, idProjeto: string|number, idUnidade: string|number) {
    idPrograma = idPrograma || '';
    idProjeto = idProjeto || '';
    idUnidade = idUnidade || '';

    return this.http.get(Rotas.TURMAS + 'filter', { params: {
        programa: `${idPrograma}` ,
        projeto: `${idPrograma}` ,
        unidade: `${idUnidade}`
      }
    });

  }
}
