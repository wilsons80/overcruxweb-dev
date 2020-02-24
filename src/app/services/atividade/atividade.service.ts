import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from 'src/app/core/atividade';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService extends BaseService<Atividade> {

    constructor(http: HttpClient) {
      super(http, Rotas.OFICINA);
    }

    getByTurma(idTurma: number) {
      return this.http.get(Rotas.OFICINA + 'turma/' + idTurma);
    }


    getAllVigentesAndPassadas() {
      return this.http.get(Rotas.OFICINA + 'vigente-e-passadas');
    }

    getAllVigentesAndFuturas() {
      return this.http.get(Rotas.OFICINA + 'vigente-e-futuras');
    }

}
