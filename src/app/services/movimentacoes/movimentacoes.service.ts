import { Movimentacoes } from 'src/app/core/movimentacoes';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class MovimentacoesService extends BaseService<Movimentacoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.MOVIMENTACOES);
  }

  getAllDestino() {
    return this.http.get(Rotas.MOVIMENTACOES + `destino`);
  }

  getAllOrigem() {
    return this.http.get(Rotas.MOVIMENTACOES + `origem`);
  }

}
