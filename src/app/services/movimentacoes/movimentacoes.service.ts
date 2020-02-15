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
}
