import { Fatura } from './../../core/fatura';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Funcoes } from 'src/app/core/funcoes';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class FaturaService extends BaseService<Fatura> {

  constructor(http: HttpClient) {
    super(http, Rotas.FATURAS);
  }

  getAllPorMovimentacoes(id: number) {
    return this.http.get(Rotas.FATURAS + 'movimentacao/' + id);
  }
 
}
