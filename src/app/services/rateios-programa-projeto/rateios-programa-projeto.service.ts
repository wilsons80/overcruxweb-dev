import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RateiosMovimentacoes } from 'src/app/core/rateios-movimentacoes';
import { RateiosProgramaProjeto } from 'src/app/core/rateios-programa-projeto';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RateiosProgramaProjetoService extends BaseService<RateiosProgramaProjeto> {

  constructor(http: HttpClient) {
    super(http, Rotas.RATEIOS_PROGRAMA_PROJETO);
  }

  getAllPorMovimento(idMovimentacao: number) {
    return this.http.get(`${Rotas.RATEIOS_PROGRAMA_PROJETO}movimentacao/${idMovimentacao}`);
  }


}
