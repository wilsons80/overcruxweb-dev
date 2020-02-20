import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ItensMovimentacoesService extends BaseService<ItensMovimentacoes> {

  constructor(http: HttpClient) {
    super(http, Rotas.ITENS_MOVIMENTACOES);
  }
}
