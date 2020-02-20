import { MovimentacoesMateriais } from './../../core/movimentacoes-materiais';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Fatura } from 'src/app/core/fatura';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class MovimentacoesMateriaisService extends BaseService<MovimentacoesMateriais> {

  constructor(http: HttpClient) {
    super(http, Rotas.MOVIMENTACOES_MATERIAIS);
  }
}
